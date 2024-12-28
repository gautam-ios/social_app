// import { useState } from "react";
// import { useRouter } from "next/router";
// import { supabase } from "../utils/supabaseClient";
// import withAuth from '../utils/withAuth';

// const CreatePost = () => {
//   const [content, setContent] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleCreatePost = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // Get the logged-in user's session
//       const { data: session } = await supabase.auth.getSession();

//       if (!session?.session?.user) {
//         setError("You must be logged in to create a post.");
//         return;
//       }

//       // Insert the post into the posts table
//       const { error: postError } = await supabase.from("posts").insert([
//         {
//           user_id: session.session.user.id,
//           content,
//         },
//       ]);

//       if (postError) {
//         setError(postError.message);
//         return;
//       }

//       alert("Post created successfully!");
//       router.push("/feed"); // Redirect to the feed page
//     } catch (error) {
//       console.error("Error creating post:", error);
//       setError("An unexpected error occurred.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form onSubmit={handleCreatePost} className="w-1/3 bg-gray-200 p-8 rounded">
//         <h1 className="text-2xl mb-4">Create a Post</h1>
//         {error && <p className="text-red-500">{error}</p>}
//         <textarea
//           placeholder="What's on your mind?"
//           className="block w-full mb-4 p-2"
//           rows={5}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 w-full">
//           Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default withAuth(CreatePost);



import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import withAuth from '../utils/withAuth';

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: session } = await supabase.auth.getSession();

      if (!session?.session?.user) {
        setError("You must be logged in to create a post.");
        return;
      }

      const { error: postError } = await supabase.from("posts").insert([
        {
          user_id: session.session.user.id,
          content,
        },
      ]);

      if (postError) {
        setError(postError.message);
        return;
      }

      alert("Post created successfully!");
      setContent("");
      router.push("/feed");
    } catch (error) {
      console.error("Error creating post:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a Post</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleCreatePost}>
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(CreatePost);
