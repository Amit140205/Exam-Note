import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import FinalResult from "../components/FinalResult";

function History() {
  const [topics, setTopics]=useState([]);
  const [isSidebarOpen, setIsSideBarOpen]=useState(false)
  const [selectedNote, setSelectedNote]=useState(null)
  const [loading, setLoading]=useState(false)
  const [activeNoteId, setActiveNoteId]=useState(null)

  const { userData } = useSelector((state) => state.user);
  const credit = userData.credit;

  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get(
          serverUrl + "/api/notes/get-all-notes",
          { withCredentials: true },
        );

        setTopics(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    getNotes();
  }, []);

  useEffect(()=>{
    const handleResize=()=>{
      if(window.innerWidth>=1024){
        setIsSideBarOpen(true)
      }else{
        setIsSideBarOpen(false)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return ()=>{
      window.removeEventListener("resize", handleResize)
    }
  },[])

  const openNote=async (noteId)=>{
    setLoading(true)
    setActiveNoteId(noteId)
    try {
       const response=await axios.get(serverUrl+`/api/notes/${noteId}`, {withCredentials:true})

       setSelectedNote(response.data.content)
       setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-6 py-8">

      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" mb-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6 items-start flex justify-between md:items-center gap-4 flex-wrap shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl font-bold bg-linear-to-r from-white via-gray-500 to-white bg-clip-text text-transparent">
            ExamNotes AI
          </h1>

          <p className="text-sm text-gray-300 mt-1">
            AI powered exam-oriented notes & revision
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">

          {/* diamond */}
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
          >
            <span className="text-xl">💎</span>
            <span>{credit}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold cursor-pointer"
            >
              ➕
            </motion.span>
          </button>

          {/* sidebar */}
          {!isSidebarOpen && <button 
          onClick={()=>setIsSideBarOpen(true)}
          className="cursor-pointer lg:hidden text-white text-2xl">
              <GiHamburgerMenu />
          </button>}
        </div>
      </motion.header>

      {/* sidebar */}
      <div
      className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence>

            {isSidebarOpen && 
              <motion.div
              initial={{x:-320}}
              animate={{x:0}}
              exit={{x:-320}}
              transition={{
                type:"spring",
                stiffness:260,
                damping:30
              }}
              className="fixed lg:static top-0 left-0 z-50 lg:z-auto w-72 lg:w-auto h-full lg:h-[75vh] lg:col-span-1 bg-black/90 lg:to-black/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.6)] p-5 overflow-y-auto lg:rounded-3xl"
              >
                
                <button
                onClick={()=>setIsSideBarOpen(false)}
                className="cursor-pointer lg:hidden text-white mb-4"
                >
                  ⬅️ Back
                </button>

                {/* history */}
                <div className="mb-4 space-y-1">
                    <button 
                    onClick={()=>navigate("/notes")}
                    className="cursor-pointer w-full px-3 py-2 rounded-lg text-sm text-gray-200 bg-white/10 hover:bg-white/20 text-start">
                        ➕ New Notes
                    </button>

                    <hr className="border-white/10 mb-4"/>

                    <h2 className="mb-4 text-lg font-bold">
                      <span className="mr-2">📚</span>
                      <span className="bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">Your Notes</span> 
                    </h2>

                    {topics?.length===0 && (
                      <p className="text-sm text-gray-400">No notes created yet</p>
                    )}

                    <ul className="space-y-3">
                        {topics?.map((topic, index)=>(
                          <li 
                          onClick={()=>openNote(topic._id)} 
                          key={index} className={`cursor-pointer rounded-xl p-3 border transition-all ${activeNoteId===topic._id?"bg-indigo-500/30 border-indigo-400 shadow-[0_0_0_1px_rgba(99,102,241,0.6)]": "bg-white/5 border-white/10 hover:bg-white/10"}`}>
                              
                            <p className="text-sm font-semibold text-white">
                              {topic?.topic}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2 text-xs">
                              {/* class level */}
                                {topic?.classLevel && <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">ClassLevel: {topic?.classLevel}</span>}

                                {/* exma type */}
                                {topic?.examType && <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">{topic?.examType}</span>}
                            </div>

                            <div className="flex gap-3 mt-2 text-xs text-gray-300">
                              {topic?.revisionMode && <span>⚡ Revision</span>}
                              {topic?.includeDiagram && <span>📊 Diagram</span>}
                              {topic?.includeChart && <span>📈 Chart</span>}
                            </div>

                          </li>
                        ))}
                    </ul>

                </div>

              </motion.div>
            }

        </AnimatePresence>

        {/* main area */}
        <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-3 rounded-xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-6 min-h-[75vh]"
        >
            {loading && <p className="text-center text-gray-500">Loading notes...</p>}

            {!loading && !selectedNote && (
              <div className="h-full flex items-center justify-center text-gray-400">
                Select a topic from the sidebar
              </div>
            )}

            {!loading && selectedNote && (
              <FinalResult result={selectedNote}/>
            )}
        </motion.div>

      </div>
    </div>
  );
}

export default History;
