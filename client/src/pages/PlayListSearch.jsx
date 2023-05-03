import Link from "next/link";
import { useState,useEffect } from "react";
import ReactPlayer from "react-player";
import Header from "../components/Header";
import Layout from "@/Layout";
import { styles } from "@/styles/style";


function Videos() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos')
        const { data } = await response.json()
        setVideos(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchVideos()
  }, [])

  if (!Array.isArray(videos) || videos.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {videos.map(video => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <video src={video.url} controls></video>
        </div>
      ))}
    </div>
  )
}

export default Videos
