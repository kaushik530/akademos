import { BookOpen, FileText, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import AppShell from "../components/layout/AppShell";
import { getResourcesData, type ResourceApiData } from "../lib/data";

export default function Resources() {
  const [data, setData] = useState<ResourceApiData | null>(null);

  useEffect(() => {
    let active = true;
    getResourcesData().then((result) => {
      if (active) setData(result);
    });
    return () => {
      active = false;
    };
  }, []);

  const resources = data?.items ?? [
    {
      title: "DBMS Unit III Notes.pdf",
      type: "PDF",
      meta: "42 pages · indexed",
      status: "Ready",
    },
    {
      title: "Database Management Systems",
      type: "BOOK",
      meta: "Chapter 1–8 · linked",
      status: "Ready",
    },
    {
      title: "Normalization lecture slides",
      type: "SLIDES",
      meta: "36 slides · indexed",
      status: "Ready",
    },
  ];

  return (
    <AppShell title="Resources" eyebrow="YOUR MATERIAL">
      <div className="resource-head">
        <div>
          <h2>Learning sources</h2>
          <p>
            Akademos uses these materials to build concepts and generate
            grounded learning content.
          </p>
        </div>
        <button className="primary-btn">
          <UploadCloud size={15} /> Upload resource
        </button>
      </div>
      <div className="resource-grid">
        {resources.map((resource) => (
          <Resource
            key={resource.title}
            title={resource.title}
            type={resource.type}
            meta={resource.meta}
            status={resource.status}
          />
        ))}
      </div>
    </AppShell>
  );
}

function Resource({
  title,
  type,
  meta,
  status,
}: {
  title: string;
  type: string;
  meta: string;
  status: string;
}) {
  return (
    <div className="resource-card">
      <div className="resource-icon">
        <FileText size={20} />
      </div>
      <div>
        <span className="micro">{type}</span>
        <h3>{title}</h3>
        <p>{meta}</p>
      </div>
      <span className="resource-status">
        <i /> {status}
      </span>
    </div>
  );
}
