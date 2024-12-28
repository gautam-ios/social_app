// // // // import { useEffect, useState } from "react";
// // // // import { supabase } from "../utils/supabaseClient";

// // // // const Home = () => {
// // // //   const [username, setUsername] = useState("");

// // // //   useEffect(() => {
// // // //     const fetchUserData = async () => {
// // // //       const { data: user } = await supabase.auth.getUser();

// // // //       if (user) {
// // // //         const { data: profile } = await supabase
// // // //           .from("profiles")
// // // //           .select("username")
// // // //           .eq("id", user.id)
// // // //           .single();

// // // //         setUsername(profile?.username || "");
// // // //       }
// // // //     };

// // // //     fetchUserData();
// // // //   }, []);

// // // //   return (
// // // //     <div className="flex justify-center items-center h-screen">
// // // //       <h1 className="text-3xl">
// // // //         Welcome to MDTECH, {username || "Guest"}!
// // // //       </h1>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Home;
// // // import { useEffect, useState } from "react";
// // // import { supabase } from "../utils/supabaseClient";

// // // const Home = () => {
// // //   const [username, setUsername] = useState<string | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchUserData = async () => {
// // //       try {
// // //         // Get the current session (user object will only be available if logged in)
// // //         const { data: session } = await supabase.auth.getSession();

// // //         if (!session?.session?.user) {
// // //           console.error("User not logged in");
// // //           setUsername(null);
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         // Get the user's ID
// // //         const userId = session.session.user.id;

// // //         // Fetch the username from the profiles table
// // //         const { data: profile, error } = await supabase
// // //           .from("profiles")
// // //           .select("username")
// // //           .eq("id", userId)
// // //           .single();

// // //         if (error) {
// // //           console.error("Error fetching profile:", error.message);
// // //           setUsername(null);
// // //         } else {
// // //           setUsername(profile?.username || null);
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching user data:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchUserData();
// // //   }, []);

// // //   if (loading) {
// // //     return <div className="flex justify-center items-center h-screen">Loading...</div>;
// // //   }

// // //   return (
// // //     <div className="flex justify-center items-center h-screen">
// // //       <h1 className="text-3xl">
// // //         {username ? `Welcome to MDTECH, ${username}!` : "Welcome to MDTECH, Guest!"}
// // //       </h1>
// // //     </div>
// // //   );
// // // };

// // // export default Home;
// // import { useState } from "react";
// // import { supabase } from "../utils/supabaseClient";
// // import { useRouter } from "next/router";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const router = useRouter();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     const { data, error } = await supabase.auth.signInWithPassword({
// //       email,
// //       password,
// //     });

// //     if (error) {
// //       setError(error.message);
// //     } else {
// //       router.push("/dashboard"); // Redirect to dashboard
// //     }
// //   };

// //   return (
// //     <div className="h-screen flex items-center justify-center bg-gray-100">
// //       <div className="w-full max-w-md bg-white p-8 rounded shadow">
// //         <h1 className="text-2xl font-bold mb-6">Login</h1>
// //         {error && <p className="text-red-500 mb-4">{error}</p>}
// //         <form onSubmit={handleLogin} className="space-y-4">
// //           <div>
// //             <label className="block font-medium mb-1">Email</label>
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block font-medium mb-1">Password</label>
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-500 text-white py-2 rounded"
// //           >
// //             Login
// //           </button>
// //         </form>
// //         <p className="mt-4 text-center">
// //           Don't have an account?{" "}
// //           <a href="/signup" className="text-blue-500 underline">
// //             Sign Up
// //           </a>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import { useState } from "react";
// import { supabase } from "../utils/supabaseClient";
// import { useRouter } from "next/router";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       router.push("/dashboard"); // Redirect to dashboard
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded shadow">
//         <h1 className="text-2xl font-bold mb-6">Login</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block font-medium mb-1">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-blue-500 underline">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  return (
    <div>
      <AuthForm isLogin={true} />
    </div>
  );
};

export default LoginPage;
