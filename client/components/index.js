/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure import { VisitorHome } from './visitor-home';
out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as VisitorHome} from './visitor-home'
export {Login, Signup} from './auth-form'
