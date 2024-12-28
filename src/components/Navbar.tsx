// // // import { useRouter } from "next/router";
// // // import { supabase } from "../utils/supabaseClient";

// // // const Navbar = () => {
// // //   const router = useRouter();

// // //   const handleLogout = async () => {
// // //     await supabase.auth.signOut();
// // //     router.push("/"); // Redirect to login after logout
// // //   };

// // //   return (
// // //     <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
// // //       <div className="flex space-x-4">
// // //         <a href="/home" className="hover:underline">
// // //           Home
// // //         </a>
// // //         <a href="/feed" className="hover:underline">
// // //           Feed
// // //         </a>
// // //         <a href="/create-post" className="hover:underline">
// // //           Create Post
// // //         </a>
// // //       </div>
// // //       <button
// // //         onClick={handleLogout}
// // //         className="bg-red-500 py-1 px-4 rounded text-white"
// // //       >
// // //         Logout
// // //       </button>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;
// // import Link from 'next/link';
// // import { useRouter } from 'next/router';
// // import { supabase } from '../utils/supabaseClient';

// // const Navbar = () => {
// //   const router = useRouter();

// //   const handleLogout = async () => {
// //     await supabase.auth.signOut();
// //     router.push('/'); // Redirect to login page after logout
// //   };

// //   return (
// //     <nav className="bg-gray-800 text-white p-4 flex justify-between">
// //       <div className="flex gap-4">
// //         {/* <Link href="/" legacyBehavior>
// //           <a className="hover:underline">Home</a>
// //         </Link> */}
// //         <Link href="/feed" legacyBehavior>
// //           <a className="hover:underline">Feed</a>
// //         </Link>
// //         <Link href="/create-post" legacyBehavior>
// //           <a className="hover:underline">Create Post</a>
// //         </Link>
// //       </div>
// //       <button
// //         onClick={handleLogout}
// //         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
// //       >
// //         Logout
// //       </button>
// //     </nav>
// //   );
// // };

// // export default Navbar;


// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { supabase } from '../utils/supabaseClient';

// const Navbar = () => {
//   const router = useRouter();

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push('/'); // Redirect to login page after logout
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-md py-4 px-8 flex justify-between items-center border-b border-gray-200 bg-blue rounded-lg">
//       <div className="flex items-center gap-6">
//         <Link href="/feed" legacyBehavior>
//           <a className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition duration-300">
//             Feed
//           </a>
//         </Link>
//         <Link href="/create-post" legacyBehavior>
//           <a className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition duration-300">
//             Create Post
//           </a>
//         </Link>
//       </div>
//       <button
//         onClick={handleLogout}
//         className="bg-gradient-to-r from-blue-300 to-blue-500 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
//       >
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default Navbar;
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // User icon

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();

        if (session?.session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', session.session.user.id)
            .single();

          if (error) {
            console.error('Error fetching username:', error.message);
          } else {
            setUsername(profile?.username || null);
          }
        }
      } catch (err) {
        console.error('Error fetching user session:', err);
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-white/30 backdrop-blur-lg shadow-lg p-4 flex justify-between items-center rounded-xl">
      {/* Left Section: Links */}
      <div className="flex gap-6">
        <Link href="/feed">
          <span className="text-gray-800 font-semibold hover:text-blue-600 transition-transform duration-300 ease-in-out cursor-pointer transform hover:scale-110">
            Feed
          </span>
        </Link>
        <Link href="/create-post">
          <span className="text-gray-800 font-semibold hover:text-blue-600 transition-transform duration-300 ease-in-out cursor-pointer transform hover:scale-110">
            Create Post
          </span>
        </Link>
      </div>

      {/* Right Section: Username and Logout Button */}
      <div className="flex items-center gap-6">
        {username && (
          <div className="flex items-center gap-2 bg-blue-100/50 px-3 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-200">
            <FaUserCircle className="text-blue-600 text-xl" />
            <span className="text-gray-800 font-medium hover:text-blue-600">
              {username}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
