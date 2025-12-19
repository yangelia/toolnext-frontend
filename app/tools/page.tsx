// app/tools/page.tsx

// import css from "./tools.module.css";
// import ToolGrid from "../../components/ToolGrid/ToolGrid";
// import type { Tool } from "@/types/tool";

// interface ToolsResponse {
//   tools: Tool[];
//   page: number;
//   perPage: number;
//   totalTools: number;
//   totalPages: number;
// }

// async function getTools(): Promise<Tool[]> {
//   const res = await fetch(
//     "http://localhost:3000/tools?perPage=16",
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch tools");
//   }

//   const data: ToolsResponse = await res.json();
//   return data.tools;
// }

// export default async function ToolsPage() {
//   const tools = await getTools();

//   return (
//     <div className={css.container}>
//       <h2 className={css.title}>
//         Всі інструменти
//       </h2>
//       <ToolGrid tools={tools} />
//     </div>
//   );
// }


import ToolsClient from "./Tools.client";
import type { Tool } from "@/types/tool";
import css from "./tools.module.css";

interface ToolsResponse {
  tools: Tool[];
  page: number;
  perPage: number;
  totalTools: number;
  totalPages: number;
}

// Попереднє серверне отримання даних (необов'язково, якщо хочеш завжди підвантажувати на клієнті)
async function getInitialTools(): Promise<
  Tool[]
> {
  const res = await fetch(
    "http://localhost:3000/tools?perPage=16",
    {
      cache: "no-store",
    }
  );

  if (!res.ok)
    throw new Error("Failed to fetch tools");

  const data: ToolsResponse = await res.json();
  return data.tools;
}

export default async function ToolsPage() {
  const initialTools = await getInitialTools();

  return (
    <div className={css.container}>
      <h2 className={css.title}>
        Всі інструменти
      </h2>
      <ToolsClient initialTools={initialTools} />
    </div>
  );
}