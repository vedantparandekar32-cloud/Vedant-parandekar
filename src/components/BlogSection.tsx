import React, { useState } from "react";
import { Blog } from "../types";
import { Star, Clock, Heart, Search, BookOpen, User, Calendar } from "lucide-react";

interface BlogSectionProps {
  blogs: Blog[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [blogsList, setBlogsList] = useState<Blog[]>(blogs);
  const [searchBlogQuery, setSearchBlogQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [likedBlogIds, setLikedBlogIds] = useState<string[]>([]);

  const handleLikeBlog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedBlogIds.includes(id)) {
      setLikedBlogIds(prev => prev.filter(x => x !== id));
      setBlogsList(prev => prev.map(b => b.id === id ? { ...b, likes: b.likes - 1 } : b));
    } else {
      setLikedBlogIds(prev => [...prev, id]);
      setBlogsList(prev => prev.map(b => b.id === id ? { ...b, likes: b.likes + 1 } : b));
    }
  };

  const filteredBlogs = blogsList.filter(b => 
    b.title.toLowerCase().includes(searchBlogQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchBlogQuery.toLowerCase()) ||
    b.content.toLowerCase().includes(searchBlogQuery.toLowerCase())
  );

  return (
    <div id="blog-section-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left animate-fade-in">
      
      {/* Title & search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 dark:border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-950 dark:text-white flex items-center gap-2">
            <BookOpen className="h-6.5 w-6.5 text-ocean" />
            <span>Wanderlust Journal & Stories</span>
          </h2>
          <p className="text-xs font-sans text-gray-500 mt-1">
            Browse through guides, travel diaries, insider food secrets, and packing tips written by our global travel authors.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            id="blog-search-input"
            type="text"
            placeholder="Search articles..."
            value={searchBlogQuery}
            onChange={(e) => setSearchBlogQuery(e.target.value)}
            className="w-full md:w-64 px-4 py-2 pl-10 rounded-full text-xs font-sans border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-ocean dark:text-white"
          />
          <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
        </div>
      </div>

      {/* Blogs list grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => {
          const liked = likedBlogIds.includes(blog.id);
          return (
            <div
              id={`blog-card-${blog.id}`}
              key={blog.id}
              onClick={() => setSelectedBlog(blog)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full transform hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 px-2.5 py-0.5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-ocean dark:text-sky border border-white/20">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5 text-left space-y-2">
                  <div className="flex items-center space-x-2 text-3xs font-mono text-gray-400">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blog.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blog.date}</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-gray-900 dark:text-white group-hover:text-ocean dark:group-hover:text-sky transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  
                  <p className="text-xs font-sans text-gray-600 dark:text-slate-350 line-clamp-3 leading-relaxed">
                    {blog.content}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 border-t border-gray-50 dark:border-slate-800/80 mt-4 flex items-center justify-between text-3xs font-mono text-gray-400">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {blog.readTime}</span>
                
                <button
                  id={`blog-like-btn-${blog.id}`}
                  onClick={(e) => handleLikeBlog(blog.id, e)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-full transition-colors ${
                    liked 
                      ? "bg-red-500/10 text-red-500 border border-red-500/20" 
                      : "bg-gray-50 text-gray-550 border border-transparent hover:bg-gray-100 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} />
                  <span className="font-sans font-bold">{blog.likes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Blog Reading Modal overlay */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            id="blog-modal-content"
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 animate-scale-up"
          >
            <div className="relative h-64 sm:h-72">
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 bg-black/40 text-white rounded-full p-1.5 hover:bg-black/60 transition-colors h-8 w-8 flex items-center justify-center font-bold text-sm"
              >
                ×
              </button>

              <div className="absolute bottom-5 left-5 right-5 text-left text-white">
                <span className="px-2 py-0.5 bg-sky/40 backdrop-blur-md rounded text-2xs font-mono font-bold tracking-wider uppercase border border-white/20">
                  {selectedBlog.category}
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl mt-2 leading-tight">
                  {selectedBlog.title}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 text-2xs font-mono text-gray-500">
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-ocean" /> By {selectedBlog.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Published {selectedBlog.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedBlog.readTime} to read</span>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-xs font-sans text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-left">
                  {selectedBlog.content}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center text-xs font-sans font-bold">
                <button
                  onClick={(e) => handleLikeBlog(selectedBlog.id, e)}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl transition-all ${
                    likedBlogIds.includes(selectedBlog.id)
                      ? "bg-red-500/10 text-red-500 border border-red-500/20"
                      : "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  <Heart className={`h-4.5 w-4.5 ${likedBlogIds.includes(selectedBlog.id) ? "fill-current" : ""}`} />
                  <span>{blogsList.find(b => b.id === selectedBlog.id)?.likes} Likes</span>
                </button>

                <button
                  onClick={() => setSelectedBlog(null)}
                  className="px-5 py-2 bg-ocean text-white rounded-xl text-xs font-bold hover:bg-ocean-dark"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
