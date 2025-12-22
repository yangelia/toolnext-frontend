"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import styles from "./toolDetails.module.css";
import ToolGallery from "@/components/ToolGallery/ToolGallery";
import ToolInfoBlock from "@/components/ToolInfoBlock/ToolInfoBlock";
import { Tool } from "@/types/tool";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default function ToolByIdPage() {
  const params = useParams();
  const id = params?.id as string;

  const [tool, setTool] = useState<Tool | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const toolResponse = await api.get(`/tools/${id}`);
        setTool(toolResponse.data);

        try {
          const userResponse = await api.get("/auth/me");
          setIsAuthenticated(Boolean(userResponse.data));
        } catch {
          setIsAuthenticated(false);
        }
      } catch (e: any) {
        console.log("message:", e.message);
        console.log("status:", e.response?.status);
        console.log("data:", e.response?.data);
      }
    };

    fetchData();
  }, [id]);

  if (!tool) {
    return <div>Loading...</div>;
  }

  return (
    <section className={`${styles.page} container`}>
      <ToolGallery images={tool.images} />
      <ToolInfoBlock tool={tool} />
    </section>
  );
}
