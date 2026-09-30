import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import Fastify, { type FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';

export const records = pgTable('records', { id: text('id').primaryKey(), kind: text('kind').notNull(), data: jsonb('data').notNull() });
export const dbClient = new PGlite();
export const db = drizzle(dbClient, { schema: { records } });
export const users = [
 { id:'user-admin', name:'Ava Admin', email:'admin@mini-jira.local', password:'password123', role:'admin' },
 { id:'user-1', name:'Sam Product', email:'sam@mini-jira.local', password:'password123', role:'member' },
 { id:'user-2', name:'Lee Engineer', email:'lee@mini-jira.local', password:'password123', role:'member' },
];
export const projects = [{ id:'project-1', name:'Mini Jira', key:'MJ', description:'Demo project', ownerId:'user-admin', memberIds:['user-admin','user-1','user-2'] }];
export const roles = [{id:'role-admin', name:'Admin', permissions:['*']},{id:'role-member',name:'Member',permissions:['issues:read','issues:write']}];
export const columns = [{id:'col-todo',name:'To Do',position:0},{id:'col-doing',name:'In Progress',position:1},{id:'col-done',name:'Done',position:2}];
export const sprints = [{id:'sprint-1',name:'Sprint 1',state:'active',projectId:'project-1'}];
export const issues = [{id:'issue-1',key:'MJ-1',title:'Welcome issue',projectId:'project-1'}];
export const tasks = [{id:'task-1',title:'Review the board',status:'todo',projectId:'project-1',issueId:'issue-1',assigneeId:'user-1',sprintId:'sprint-1',position:0}];
export const comments = [{id:'comment-1',body:'Welcome!',taskId:'task-1',authorId:'user-admin'}];
export const labels = [{id:'label-1',name:'frontend',color:'#6366f1'}];
export const API = [
 ['POST','/auth/register','Register a user'],['POST','/auth/login','Log in and receive a JWT'],['POST','/auth/logout','Revoke token'],['POST','/auth/refresh','Refresh access token'],['GET','/auth/me','Current user profile'],
 ['GET','/users','List users (admin)'],['GET','/users/:id','Get user'],['PATCH','/users/:id','Update user'],['DELETE','/users/:id','Delete user'],
 ['GET','/projects','List accessible projects'],['POST','/projects','Create project'],['GET','/projects/:id','Get project'],['PATCH','/projects/:id','Update project'],['DELETE','/projects/:id','Delete project'],['GET','/projects/:id/members','List project members'],['POST','/projects/:id/members','Add project member'],['DELETE','/projects/:id/members/:userId','Remove project member'],
 ['GET','/projects/:id/roles','List roles'],['POST','/projects/:id/roles','Create role'],['PATCH','/projects/:id/roles/:roleId','Update role'],['DELETE','/projects/:id/roles/:roleId','Delete role'],['PATCH','/projects/:id/members/:userId/role','Change member role'],
 ['GET','/projects/:id/board','Get board'],['PATCH','/projects/:id/board','Update board'],['GET','/projects/:id/board/columns','List columns'],['POST','/projects/:id/board/columns','Create column'],['PATCH','/projects/:id/board/columns/:columnId','Update column'],['DELETE','/projects/:id/board/columns/:columnId','Delete column'],['PATCH','/projects/:id/board/columns/reorder','Reorder columns'],
 ['GET','/projects/:id/sprints','List sprints'],['POST','/projects/:id/sprints','Create sprint'],['GET','/projects/:id/sprints/:sprintId','Get sprint'],['PATCH','/projects/:id/sprints/:sprintId','Update sprint'],['DELETE','/projects/:id/sprints/:sprintId','Delete sprint'],['POST','/projects/:id/sprints/:sprintId/start','Start sprint'],['POST','/projects/:id/sprints/:sprintId/complete','Complete sprint'],
 ['GET','/projects/:id/issues','List issues'],['POST','/projects/:id/issues','Create issue'],['GET','/projects/:id/issues/:issueId','Get issue'],['PATCH','/projects/:id/issues/:issueId','Update issue'],['DELETE','/projects/:id/issues/:issueId','Delete issue'],
 ['GET','/projects/:id/issues/:issueId/tasks','List issue tasks'],['POST','/projects/:id/issues/:issueId/tasks','Create task'],['GET','/projects/:id/tasks','List project tasks'],['GET','/projects/:id/tasks/:taskId','Get task'],['PATCH','/projects/:id/tasks/:taskId','Update task'],['DELETE','/projects/:id/tasks/:taskId','Delete task'],['PATCH','/projects/:id/tasks/:taskId/move','Move task'],['PATCH','/projects/:id/tasks/reorder','Reorder tasks'],
 ['GET','/projects/:id/tasks/:taskId/comments','List comments'],['POST','/projects/:id/tasks/:taskId/comments','Create comment'],['PATCH','/projects/:id/tasks/:taskId/comments/:commentId','Update comment'],['DELETE','/projects/:id/tasks/:taskId/comments/:commentId','Delete comment'],
 ['GET','/projects/:id/labels','List labels'],['POST','/projects/:id/labels','Create label'],['PATCH','/projects/:id/labels/:labelId','Update label'],['DELETE','/projects/:id/labels/:labelId','Delete label'],
] as const;
const secret = process.env.JWT_SECRET ?? 'mini-jira-dev-secret-change-me';
const tokenFor = (id: string) => jwt.sign({ sub:id }, secret, { expiresIn:'1h' });
const collections: Record<string, any[]> = { users, projects, roles, columns, sprints, issues, tasks, comments, labels };
const collFor = (path:string): any[] => path.includes('/members') ? users : path.includes('/roles') ? roles : path.includes('/columns') || path.endsWith('/board') ? columns : path.includes('/sprints') ? sprints : path.includes('/issues') ? issues : path.includes('/comments') ? comments : path.includes('/labels') ? labels : path.includes('/tasks') ? tasks : path.includes('/users') ? users : projects;
function routePath(path:string) { return path.replace(/:([A-Za-z0-9_]+)/g, '{$1}'); }
export async function buildApp(): Promise<FastifyInstance> {
 await dbClient.exec(`CREATE TABLE IF NOT EXISTS records (id text primary key, kind text not null, data jsonb not null)`);
 for (const [kind, rows] of Object.entries(collections)) for (const row of rows) await db.insert(records).values({id:row.id,kind,data:row}).onConflictDoNothing();
 const app = Fastify({ logger:false });
 await app.register(swagger,{ openapi:{ info:{title:'Mini Jira Mock API',version:'1.0.0',description:'Versioned in-memory REST API for Mini Jira'},servers:[{url:'/api/v1'}],components:{securitySchemes:{bearerAuth:{type:'http',scheme:'bearer',bearerFormat:'JWT'}}}}});
 await app.register(swaggerUi,{routePrefix:'/docs'});
 app.addHook('onRequest', async (req, reply) => {
   if (req.url.startsWith('/docs') || req.url.startsWith('/documentation') || req.url==='/api/v1/auth/login' || req.url==='/api/v1/auth/register') return;
   const h=req.headers.authorization; if (!h?.startsWith('Bearer ')) return reply.code(401).send({error:'Unauthorized'});
   try { (req as any).userId=(jwt.verify(h.slice(7),secret) as jwt.JwtPayload).sub; } catch { return reply.code(401).send({error:'Invalid token'}); }
 });
 app.get('/health', async()=>({status:'ok'}));
 for (const [method,path,description] of API) {
   const url='/api/v1'+path.replace(/:([A-Za-z0-9_]+)/g, ':$1');
   app.route({method:method as any,url,schema:{summary:description,tags:[path.split('/')[2] ?? 'api'],security:path.startsWith('/auth/') && ['register','login'].some(x=>path.endsWith(x)) ? [] : [{bearerAuth:[]}], ...(path.includes(':')?{params:{type:'object',additionalProperties:{type:'string'}}}:{})},handler:async(req,reply)=>{
     const body=(req.body ?? {}) as Record<string,any>, p=req.params as Record<string,string>, userId=(req as any).userId;
     if (path==='/auth/login') {const u=users.find(x=>x.email===body.email && x.password===body.password); if(!u)return reply.code(401).send({error:'Invalid credentials'}); return {accessToken:tokenFor(u.id),refreshToken:tokenFor(u.id),user:{...u,password:undefined}};}
     if (path==='/auth/register') {if(!body.email || !body.password)return reply.code(400).send({error:'email and password required'}); if(users.some(u=>u.email===body.email))return reply.code(409).send({error:'Email already registered'}); const u:any={id:randomUUID(),role:'member',...body}; users.push(u); return reply.code(201).send({user:{...u,password:undefined},accessToken:tokenFor(u.id),refreshToken:tokenFor(u.id)});}
     if (path==='/auth/logout') return reply.code(204).send();
     if (path==='/auth/refresh') return {accessToken:tokenFor(userId)};
     if (path==='/auth/me') return users.find(u=>u.id===userId) ?? users[0];
     let coll=collFor(path); const id=p.id ?? p.userId ?? p.taskId ?? p.issueId ?? p.sprintId ?? p.columnId ?? p.roleId ?? p.commentId ?? p.labelId;
     if (method==='GET') {
       if (id) {const item=coll.find(x=>x.id===id); if(!item)return reply.code(404).send({error:'Not found'}); return item;}
       if (path.endsWith('/board'))return {columns};
       if (path.endsWith('/members'))return projects.find(x=>x.id===p.id)?.memberIds.map(mid=>users.find(u=>u.id===mid)).filter(Boolean) ?? [];
       if (path.includes('/issues/') && path.endsWith('/tasks'))return tasks.filter(x=>x.issueId===p.issueId);
       if (path.includes('/tasks/') && path.endsWith('/comments'))return comments.filter(x=>x.taskId===p.taskId);
       if(path==='/users' && users.find(u=>u.id===userId)?.role!=='admin')return reply.code(403).send({error:'Admin required'});
       if(path==='/projects')return projects.filter(x=>x.memberIds.includes(userId));
       if(path.endsWith('/tasks'))return tasks.filter(x=>x.projectId===p.id);
       return coll;
     }
     if (method==='POST') {const item:any={id:randomUUID(),...body}; if(path.endsWith('/members')){const project=projects.find(x=>x.id===p.id); if(!project)return reply.code(404).send({error:'Project not found'}); if(body.userId&&!project.memberIds.includes(body.userId))project.memberIds.push(body.userId); return reply.code(201).send(users.find(u=>u.id===body.userId)??item);} if(path.endsWith('/tasks')){item.projectId=p.id;item.issueId=p.issueId;} coll.push(item); return reply.code(201).send(item);}
     if (method==='PATCH') {if(path.endsWith('/reorder'))return {updated:true}; const item=coll.find(x=>x.id===id); if(!item)return reply.code(404).send({error:'Not found'}); Object.assign(item,body); if(path.endsWith('/start'))item.state='active'; if(path.endsWith('/complete'))item.state='completed'; return item;}
     if (method==='DELETE') {const i=coll.findIndex(x=>x.id===id); if(i>=0)coll.splice(i,1); return reply.code(204).send();}
     return reply.code(200).send({ok:true});
   }});
 }
 return app;
}
if (process.argv[1]?.replaceAll('\\\\','/').endsWith('/src/index.ts')) buildApp().then(app=>app.listen({port:Number(process.env.PORT)||4000,host:'0.0.0.0'})).then(()=>console.log('Mini Jira API: http://localhost:4000/docs'));


