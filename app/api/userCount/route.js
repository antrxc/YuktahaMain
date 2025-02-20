// import { connectToDatabase } from "@/lib/mongodb";
// import UserDetails from "@/models/UserDetails";

// export async function GET() {
//   try {
//     await connectToDatabase();

//     const userCount = await UserDetails.countDocuments(); // 🔥 Get count of all users

//     return new Response(JSON.stringify({ count: userCount }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching user count:", error);
//     return new Response(
//       JSON.stringify({ error: "Error fetching user count" }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }

import { connectToDatabase } from "@/lib/mongodb";
import UserDetails from "@/models/UserDetails";

export async function GET(req) {
  try {
    const { email } = await req.json(); // 🔥 Get the email from the request body

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // 🔹 Check if user exists and is an admin
    const user = await UserDetails.findOne({ email });

    if (!user || user.userLevel !== "admin") {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Admin access required" }),
        {
          status: 403, // Forbidden
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // ✅ Get count of all users
    const userCount = await UserDetails.countDocuments();

    return new Response(JSON.stringify({ count: userCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user count:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching user count" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export const dynamic = 'force-dynamic';
