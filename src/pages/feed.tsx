// // // import { useEffect, useState } from "react";
// // // import { supabase } from "../utils/supabaseClient";

// // // const Feed = () => {
// // //   const [posts, setPosts] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchPosts = async () => {
// // //       try {
// // //         // Fetch posts along with the username of the post creator
// // //         const { data, error } = await supabase
// // //           .from("posts")
// // //           .select("id, content, created_at, profiles(username)")
// // //           .order("created_at", { ascending: false });

// // //         if (error) {
// // //           console.error("Error fetching posts:", error);
// // //           return;
// // //         }

// // //         setPosts(data || []);
// // //       } catch (error) {
// // //         console.error("Error fetching posts:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchPosts();
// // //   }, []);

// // //   if (loading) {
// // //     return <div className="flex justify-center items-center h-screen">Loading...</div>;
// // //   }

// // //   return (
// // //     <div className="p-8">
// // //       <h1 className="text-3xl mb-4">Feed</h1>
// // //       {posts.length === 0 ? (
// // //         <p>No posts available.</p>
// // //       ) : (
// // //         <div className="space-y-4">
// // //           {posts.map((post) => (
// // //             <div key={post.id} className="p-4 bg-gray-100 rounded shadow">
// // //               <h2 className="text-xl font-bold">{post.profiles.username}</h2>
// // //               <p className="text-gray-700">{post.content}</p>
// // //               <p className="text-gray-500 text-sm">
// // //                 {new Date(post.created_at).toLocaleString()}
// // //               </p>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Feed;
// // import { useEffect, useState } from "react";
// // import { supabase } from "../utils/supabaseClient";

// // const Feed = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch posts with the number of likes
// //   const fetchPosts = async () => {
// //     try {
// //       const { data, error } = await supabase
// //         .from("posts")
// //         .select(`
// //           id,
// //           content,
// //           created_at,
// //           profiles (
// //             username
// //           ),
// //           likes (
// //             id
// //           )
// //         `)
// //         .order("created_at", { ascending: false });

// //       if (error) {
// //         console.error("Error fetching posts:", error.message);
// //         return;
// //       }

// //       // Transform data to include like counts
// //       const postsWithLikes = data.map((post) => ({
// //         ...post,
// //         likeCount: post.likes ? post.likes.length : 0, // Count likes
// //       }));

// //       setPosts(postsWithLikes || []);
// //     } catch (error) {
// //       console.error("Error fetching posts:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle like/unlike for a post
// //   const handleLike = async (postId) => {
// //     try {
// //       const { data: session } = await supabase.auth.getSession();
// //       if (!session?.session?.user) {
// //         alert("You need to log in to like a post.");
// //         return;
// //       }

// //       const userId = session.session.user.id;

// //       // Check if the user already liked the post
// //       const { data: existingLike, error: fetchError } = await supabase
// //         .from("likes")
// //         .select("id")
// //         .eq("post_id", postId)
// //         .eq("user_id", userId)
// //         .single();

// //       if (fetchError && fetchError.code !== "PGRST116") {
// //         console.error("Error checking existing like:", fetchError.message);
// //         return;
// //       }

// //       if (existingLike) {
// //         // Unlike the post
// //         const { error: unlikeError } = await supabase
// //           .from("likes")
// //           .delete()
// //           .eq("id", existingLike.id);

// //         if (unlikeError) {
// //           console.error("Error unliking post:", unlikeError.message);
// //         }
// //       } else {
// //         // Like the post
// //         const { error: likeError } = await supabase.from("likes").insert([
// //           { post_id: postId, user_id: userId },
// //         ]);

// //         if (likeError) {
// //           console.error("Error liking post:", likeError.message);
// //         }
// //       }

// //       // Refresh posts to update like counts
// //       fetchPosts();
// //     } catch (error) {
// //       console.error("Error handling like:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPosts();
// //   }, []);

// //   if (loading) {
// //     return <div className="flex justify-center items-center h-screen">Loading...</div>;
// //   }

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-3xl mb-4">Feed</h1>
// //       {posts.length === 0 ? (
// //         <p>No posts available.</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {posts.map((post) => (
// //             <div key={post.id} className="p-4 bg-gray-100 rounded shadow">
// //               <h2 className="text-xl font-bold">{post.profiles.username}</h2>
// //               <p className="text-gray-700">{post.content}</p>
// //               <p className="text-gray-500 text-sm">
// //                 {new Date(post.created_at).toLocaleString()}
// //               </p>
// //               <div className="flex items-center space-x-4 mt-2">
// //                 <button
// //                   onClick={() => handleLike(post.id)}
// //                   className="bg-blue-500 text-white p-2 rounded"
// //                 >
// //                   Like
// //                 </button>
// //                 <span>{post.likeCount} Likes</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Feed;
// // this is without logout=======================



// import { useEffect, useState } from "react";
// import { supabase } from "../utils/supabaseClient";
// import withAuth from '../utils/withAuth';

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch posts with the number of likes
//   const fetchPosts = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("posts")
//         .select(`
//           id,
//           content,
//           created_at,
//           profiles (
//             username
//           ),
//           likes (
//             id
//           )
//         `)
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Error fetching posts:", error.message);
//         return;
//       }

//       // Transform data to include like counts
//       const postsWithLikes = data.map((post) => ({
//         ...post,
//         likeCount: post.likes ? post.likes.length : 0, // Count likes
//       }));

//       setPosts(postsWithLikes || []);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle like/unlike for a post
//   const handleLike = async (postId) => {
//     try {
//       const { data: session } = await supabase.auth.getSession();
//       if (!session?.session?.user) {
//         alert("You need to log in to like a post.");
//         return;
//       }

//       const userId = session.session.user.id;

//       // Check if the user already liked the post
//       const { data: existingLike, error: fetchError } = await supabase
//         .from("likes")
//         .select("id")
//         .eq("post_id", postId)
//         .eq("user_id", userId)
//         .single();

//       if (fetchError && fetchError.code !== "PGRST116") {
//         console.error("Error checking existing like:", fetchError.message);
//         return;
//       }

//       if (existingLike) {
//         // Unlike the post
//         const { error: unlikeError } = await supabase
//           .from("likes")
//           .delete()
//           .eq("id", existingLike.id);

//         if (unlikeError) {
//           console.error("Error unliking post:", unlikeError.message);
//         }
//       } else {
//         // Like the post
//         const { error: likeError } = await supabase.from("likes").insert([
//           { post_id: postId, user_id: userId },
//         ]);

//         if (likeError) {
//           console.error("Error liking post:", likeError.message);
//         }
//       }

//       // Refresh posts to update like counts
//       fetchPosts();
//     } catch (error) {
//       console.error("Error handling like:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl mb-4">Feed</h1>
//       {posts.length === 0 ? (
//         <p>No posts available.</p>
//       ) : (
//         <div className="space-y-4">
//           {posts.map((post) => (
//             <div key={post.id} className="p-4 bg-gray-100 rounded shadow">
//               <h2 className="text-xl font-bold">{post.profiles.username}</h2>
//               <p className="text-gray-700">{post.content}</p>
//               <p className="text-gray-500 text-sm">
//                 {new Date(post.created_at).toLocaleString()}
//               </p>
//               <div className="flex items-center space-x-4 mt-2">
//                 <button
//                   onClick={() => handleLike(post.id)}
//                   className="bg-blue-500 text-white p-2 rounded"
//                 >
//                   Like
//                 </button>
//                 <span>{post.likeCount} Likes</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // export default Feed;
// export default withAuth(Feed);



import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import withAuth from '../utils/withAuth';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          content,
          created_at,
          profiles (
            username
          ),
          likes (
            id
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error.message);
        return;
      }

      const postsWithLikes = data.map((post) => ({
        ...post,
        likeCount: post.likes ? post.likes.length : 0,
      }));

      setPosts(postsWithLikes || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        alert("You need to log in to like a post.");
        return;
      }

      const userId = session.session.user.id;

      const { data: existingLike, error: fetchError } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error checking existing like:", fetchError.message);
        return;
      }

      if (existingLike) {
        const { error: unlikeError } = await supabase
          .from("likes")
          .delete()
          .eq("id", existingLike.id);

        if (unlikeError) {
          console.error("Error unliking post:", unlikeError.message);
        }
      } else {
        const { error: likeError } = await supabase.from("likes").insert([
          { post_id: postId, user_id: userId },
        ]);

        if (likeError) {
          console.error("Error liking post:", likeError.message);
        }
      }

      fetchPosts();
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Feed</h1>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts to show.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                    {post.profiles.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-lg font-bold">{post.profiles.username}</p>
                    <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-gray-800 text-lg mb-4">{post.content}</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                  >
                    Like
                  </button>
                  <span className="text-gray-600">{post.likeCount} Likes</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(Feed);
