import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

function AdminProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    const res = await axios.get("https://blog-app-0740.onrender.com/admin-api/users", { withCredentials: true });
    setUsers(res.data.payload);
  };

  const getArticles = async () => {
    const res = await axios.get("https://blog-app-0740.onrender.com/admin-api/articles", { withCredentials: true });
    setArticles(res.data.payload);
  };

  useEffect(() => {
    const getAdminData = async () => {
      try {
        setLoading(true);
        await getUsers();
        await getArticles();
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    getAdminData();
  }, []);

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleUserStatus = async (userObj) => {
    try {
      const res = await axios.patch(
        "https://blog-app-0740.onrender.com/admin-api/users",
        {
          userId: userObj._id,
          isUserActive: !userObj.isUserActive,
        },
        { withCredentials: true },
      );

      setUsers(users.map((user) => (user._id === userObj._id ? res.data.payload : user)));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user");
    }
  };

  const toggleArticleStatus = async (articleObj) => {
    try {
      const res = await axios.patch(
        "https://blog-app-0740.onrender.com/admin-api/articles",
        {
          articleId: articleObj._id,
          isArticleActive: !articleObj.isArticleActive,
        },
        { withCredentials: true },
      );

      setArticles(articles.map((article) => (article._id === articleObj._id ? res.data.payload : article)));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update article");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading admin dashboard...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="bg-white border border-[#e8e8ed] rounded-3xl p-6 mb-8 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm text-[#6e6e73]">Admin Dashboard</p>
          <h2 className="text-xl font-semibold text-[#1d1d1f]">{currentUser?.firstName}</h2>
        </div>

        <button
          className="bg-[#ff3b30] text-white text-sm px-5 py-2 rounded-full hover:bg-[#d62c23] transition"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex gap-3 mb-6 bg-[#f5f5f7] p-2 rounded-full w-fit">
        <button
          className={
            activeTab === "users"
              ? "bg-white px-5 py-2 rounded-full text-[#0066cc] text-sm font-medium shadow-sm"
              : "px-5 py-2 text-sm text-[#6e6e73]"
          }
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>

        <button
          className={
            activeTab === "articles"
              ? "bg-white px-5 py-2 rounded-full text-[#0066cc] text-sm font-medium shadow-sm"
              : "px-5 py-2 text-sm text-[#6e6e73]"
          }
          onClick={() => setActiveTab("articles")}
        >
          Articles
        </button>
      </div>

      {activeTab === "users" && (
        <div className="space-y-4">
          {users.map((userObj) => (
            <div
              key={userObj._id}
              className="bg-white border border-[#e8e8ed] rounded-2xl p-5 shadow-sm flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-[#1d1d1f]">
                  {userObj.firstName} {userObj.lastName}
                </h3>
                <p className="text-sm text-[#6e6e73]">{userObj.email}</p>
                <p className="text-xs text-[#6e6e73] mt-1">{userObj.role}</p>
              </div>

              <button
                className={
                  userObj.isUserActive
                    ? "bg-[#ff3b30] text-white px-4 py-2 rounded-full text-sm"
                    : "bg-[#34c759] text-white px-4 py-2 rounded-full text-sm"
                }
                onClick={() => toggleUserStatus(userObj)}
              >
                {userObj.isUserActive ? "Block" : "Unblock"}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "articles" && (
        <div className="space-y-4">
          {articles.map((articleObj) => (
            <div
              key={articleObj._id}
              className="bg-white border border-[#e8e8ed] rounded-2xl p-5 shadow-sm flex items-center justify-between gap-6"
            >
              <div>
                <h3 className="font-semibold text-[#1d1d1f]">{articleObj.title}</h3>
                <p className="text-sm text-[#6e6e73]">{articleObj.category}</p>
                <p className="text-xs text-[#6e6e73] mt-1">
                  Author: {articleObj.author?.firstName} {articleObj.author?.lastName}
                </p>
                <p className="text-sm text-[#6e6e73] mt-2">{articleObj.content?.slice(0, 100)}...</p>
              </div>

              <button
                className={
                  articleObj.isArticleActive
                    ? "bg-[#ff3b30] text-white px-4 py-2 rounded-full text-sm"
                    : "bg-[#34c759] text-white px-4 py-2 rounded-full text-sm"
                }
                onClick={() => toggleArticleStatus(articleObj)}
              >
                {articleObj.isArticleActive ? "Delete" : "Restore"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
