// // // // import "@/styles/globals.css";
// // // // import type { AppProps } from "next/app";

// // // // export default function App({ Component, pageProps }: AppProps) {
// // // //   return <Component {...pageProps} />;
// // // // }


// // // import { supabase } from '../utils/supabaseClient';
// // // import { useEffect, useState } from 'react';
// // // import { useRouter } from 'next/router';
// // // import '../styles/globals.css';

// // // const App = ({ Component, pageProps }: any) => {
// // //   const [user, setUser] = useState(null);
// // //   const router = useRouter();

// // //   useEffect(() => {
// // //     const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
// // //       setUser(session?.user || null);
// // //     });

// // //     const getUser = async () => {
// // //       const {
// // //         data: { user },
// // //       } = await supabase.auth.getUser();
// // //       setUser(user);
// // //     };

// // //     getUser();
// // //     return () => subscription?.unsubscribe();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (user === null && router.pathname !== '/login' && router.pathname !== '/signup') {
// // //       router.push('/login');
// // //     }
// // //   }, [user, router]);

// // //   return <Component {...pageProps} />;
// // // };

// // // export default App;
// // import "../styles/globals.css";
// // import Link from "next/link";
// // import { AppProps } from "next/app";

// // function MyApp({ Component, pageProps }: AppProps) {
// //   return (
// //     <div>
// //       <nav className="p-4 bg-gray-800 text-white">
// //         <Link href="/" className="mr-4">
// //           Home
// //         </Link>
// //         <Link href="/feed" className="mr-4">
// //           Feed
// //         </Link>
// //         <Link href="/create-post" className="mr-4">
// //           Create Post
// //         </Link>
// //       </nav>
// //       <Component {...pageProps} />
// //     </div>
// //   );
// // }

// // export default MyApp;
// ///this is new chatgpt code 



// import "../styles/globals.css";
// import Link from "next/link";
// import { AppProps } from "next/app";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { supabase } from "../utils/supabaseClient";

// function MyApp({ Component, pageProps }: AppProps) {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const { data: session } = await supabase.auth.getSession();
//       if (session?.session?.user) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   // Pages without navbar
//   const noNavbarPages = ["/", "/signup", "/login"];

//   return (
//     <div>
//       {!noNavbarPages.includes(router.pathname) && isAuthenticated && (
//         <nav className="p-4 bg-gray-800 text-white">
//           <Link href="/" className="mr-4">
//             Home
//           </Link>
//           <Link href="/feed" className="mr-4">
//             Feed
//           </Link>
//           <Link href="/create-post" className="mr-4">
//             Create Post
//           </Link>
//         </nav>
//       )}
//       <Component {...pageProps} />
//     </div>
//   );
// }

// export default MyApp;
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Don't show Navbar on login or signup pages
  const noNavbarRoutes = ['/', '/signup'];

  return (
    <div>
      {!noNavbarRoutes.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
