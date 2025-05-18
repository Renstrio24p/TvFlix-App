// import * as jwtDecode from 'jwt-decode';
// import { Common } from 'redux/redux.types';

// const decodeToken = (token: string): any => {
//     try {
//         return jwtDecode.jwtDecode(token) as any;
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         return null;
//     }
// };

// export const isAuthenticated = (card: Common['user'][number]) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         return false;
//     }
//     try {
//         const decodedToken = decodeToken(token);
//         return decodedToken && (card.role === 'teacher' || card.role === 'superadmin');
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         return false;
//     }
// };