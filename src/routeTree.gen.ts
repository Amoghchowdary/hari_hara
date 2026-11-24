/* eslint-disable */
// @ts-nocheck
// V5 uses this checked-in route tree without the TanStack Router Vite plugin.
// When adding/removing routes, update or regenerate this file before deployment.
import { Route as rootRouteImport } from './routes/__root'
import { Route as QuoteRouteImport } from './routes/quote'
import { Route as ProjectsRouteImport } from './routes/projects'
import { Route as ContactRouteImport } from './routes/contact'
import { Route as AboutRouteImport } from './routes/about'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ServicesIndexRouteImport } from './routes/services.index'
import { Route as ServicesSlugRouteImport } from './routes/services.$slug'

const QuoteRoute = QuoteRouteImport.update({ id: '/quote', path: '/quote', getParentRoute: () => rootRouteImport } as any)
const ProjectsRoute = ProjectsRouteImport.update({ id: '/projects', path: '/projects', getParentRoute: () => rootRouteImport } as any)
const ContactRoute = ContactRouteImport.update({ id: '/contact', path: '/contact', getParentRoute: () => rootRouteImport } as any)
const AboutRoute = AboutRouteImport.update({ id: '/about', path: '/about', getParentRoute: () => rootRouteImport } as any)
const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const ServicesIndexRoute = ServicesIndexRouteImport.update({ id: '/services/', path: '/services/', getParentRoute: () => rootRouteImport } as any)
const ServicesSlugRoute = ServicesSlugRouteImport.update({ id: '/services/$slug', path: '/services/$slug', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
 '/': typeof IndexRoute
 '/about': typeof AboutRoute
 '/contact': typeof ContactRoute
 '/projects': typeof ProjectsRoute
 '/quote': typeof QuoteRoute
 '/services/': typeof ServicesIndexRoute
 '/services/$slug': typeof ServicesSlugRoute
}
export interface FileRoutesByTo {
 '/': typeof IndexRoute
 '/about': typeof AboutRoute
 '/contact': typeof ContactRoute
 '/projects': typeof ProjectsRoute
 '/quote': typeof QuoteRoute
 '/services': typeof ServicesIndexRoute
 '/services/$slug': typeof ServicesSlugRoute
}
export interface FileRoutesById {
 __root__: typeof rootRouteImport
 '/': typeof IndexRoute
 '/about': typeof AboutRoute
 '/contact': typeof ContactRoute
 '/projects': typeof ProjectsRoute
 '/quote': typeof QuoteRoute
 '/services/': typeof ServicesIndexRoute
 '/services/$slug': typeof ServicesSlugRoute
}
export interface FileRouteTypes {
 fileRoutesByFullPath: FileRoutesByFullPath
 fullPaths: '/' | '/about' | '/contact' | '/projects' | '/quote' | '/services/' | '/services/$slug'
 fileRoutesByTo: FileRoutesByTo
 to: '/' | '/about' | '/contact' | '/projects' | '/quote' | '/services' | '/services/$slug'
 id: '__root__' | '/' | '/about' | '/contact' | '/projects' | '/quote' | '/services/' | '/services/$slug'
 fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
 IndexRoute: typeof IndexRoute
 AboutRoute: typeof AboutRoute
 ContactRoute: typeof ContactRoute
 ProjectsRoute: typeof ProjectsRoute
 QuoteRoute: typeof QuoteRoute
 ServicesIndexRoute: typeof ServicesIndexRoute
 ServicesSlugRoute: typeof ServicesSlugRoute
}

declare module '@tanstack/react-router' {
 interface FileRoutesByPath {
  '/quote': { id:'/quote'; path:'/quote'; fullPath:'/quote'; preLoaderRoute: typeof QuoteRouteImport; parentRoute: typeof rootRouteImport }
  '/projects': { id:'/projects'; path:'/projects'; fullPath:'/projects'; preLoaderRoute: typeof ProjectsRouteImport; parentRoute: typeof rootRouteImport }
  '/contact': { id:'/contact'; path:'/contact'; fullPath:'/contact'; preLoaderRoute: typeof ContactRouteImport; parentRoute: typeof rootRouteImport }
  '/about': { id:'/about'; path:'/about'; fullPath:'/about'; preLoaderRoute: typeof AboutRouteImport; parentRoute: typeof rootRouteImport }
  '/': { id:'/'; path:'/'; fullPath:'/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
  '/services/': { id:'/services/'; path:'/services'; fullPath:'/services/'; preLoaderRoute: typeof ServicesIndexRouteImport; parentRoute: typeof rootRouteImport }
  '/services/$slug': { id:'/services/$slug'; path:'/services/$slug'; fullPath:'/services/$slug'; preLoaderRoute: typeof ServicesSlugRouteImport; parentRoute: typeof rootRouteImport }
 }
}
const rootRouteChildren: RootRouteChildren = {
 IndexRoute, AboutRoute, ContactRoute, ProjectsRoute, QuoteRoute, ServicesIndexRoute, ServicesSlugRoute
}
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
