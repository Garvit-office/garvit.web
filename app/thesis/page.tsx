"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  FileText, 
  ArrowLeft, 
  Download, 
  Sparkles, 
  Clock, 
  Plus, 
  X, 
  Upload,
  Check
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ThesisItem {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  status: string;
  targetPublication: string;
  abstract: string;
  keywords: string[];
  sections: { title: string; content: string }[];
}

const initialTheses: ThesisItem[] = [
  {
    id: "1",
    title: "Optimizing Long-Term Memory Retrieval in Agentic Workflows Using Hybrid Vector-Graph Architectures",
    authors: ["Garvit Chawla"],
    institution: "Chitkara University",
    status: "In Progress / Pre-Print Preparation",
    targetPublication: "Q3 2026",
    abstract: "Large Language Model agents often struggle with maintaining coherent, long-term context across extended task horizons due to context window limitations and semantic drift in standard vector retrieval stores. This research introduces a hybrid vector-graph memory architecture that couples dense embedding similarity with entity relationship graphs.",
    keywords: ["Agentic Workflows", "Long-Term Memory", "LangGraph", "Mem0", "Knowledge Graphs"],
    sections: [
      { title: "1. Introduction & Problem Statement", content: "As LLM agents transition from stateless request-response handlers to autonomous persistent workers, memory management becomes critical." },
      { title: "2. Hybrid Architecture Design", content: "We propose a dual-layer memory controller handling real-time semantic caching and dynamic knowledge graphs." }
    ]
  }
];

const ThesisPage = () => {
  const [theses, setTheses] = useState<ThesisItem[]>(initialTheses);
  const [selectedId, setSelectedId] = useState<string>(initialTheses[0].id);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for uploading/adding a new thesis
  const [newTitle, setNewTitle] = useState("");
  const [newInstitution, setNewInstitution] = useState("Chitkara University");
  const [newStatus, setNewStatus] = useState("In Progress");
  const [newAbstract, setNewAbstract] = useState("");
  const [newKeywords, setNewKeywords] = useState("");

  // Hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userTheses");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTheses(parsed);
          setSelectedId(parsed[0].id);
        }
      } catch (e) {
        console.error("Failed to parse saved theses", e);
      }
    }
  }, []);

  const saveToStorage = (updated: ThesisItem[]) => {
    setTheses(updated);
    localStorage.setItem("userTheses", JSON.stringify(updated));
  };

  const handleAddThesis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAbstract.trim()) return;

    const newItem: ThesisItem = {
      id: Date.now().toString(),
      title: newTitle,
      authors: ["Garvit Chawla"],
      institution: newInstitution,
      status: newStatus,
      targetPublication: "2026",
      abstract: newAbstract,
      keywords: newKeywords ? newKeywords.split(",").map(k => k.trim()) : ["Research"],
      sections: [
        { title: "1. Overview", content: newAbstract }
      ]
    };

    const updated = [newItem, ...theses];
    saveToStorage(updated);
    setSelectedId(newItem.id);
    setIsModalOpen(false);

    // Reset form
    setNewTitle("");
    setNewAbstract("");
    setNewKeywords("");
  };

  const activeThesis = theses.find(t => t.id === selectedId) || theses[0];

  const handleCopyCitation = () => {
    const citation = `@article{chawla2026thesis,
  title={${activeThesis.title}},
  author={Garvit Chawla},
  journal={Chitkara University Research Pre-Print},
  year={2026}
}`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 selection:bg-primary/20 selection:text-primary py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Top Bar: Back & Add Button */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <Button 
            onClick={() => setIsModalOpen(true)}
            size="sm" 
            className="gradient-primary text-white rounded-full gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Upload New Thesis
          </Button>
        </div>

        {/* Thesis Switcher Tabs if multiple exist */}
        {theses.length > 1 && (
          <div className="flex overflow-x-auto gap-2 pb-4 mb-6">
            {theses.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                  t.id === selectedId 
                    ? "bg-primary text-primary-foreground border-primary shadow-xs" 
                    : "bg-background/60 text-muted-foreground border-border hover:border-accent"
                }`}
              >
                {t.title.slice(0, 32)}...
              </button>
            ))}
          </div>
        )}

        {/* Header Section */}
        <motion.div
          key={activeThesis.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="gradient-primary text-white border-0 rounded-full px-3 py-1 text-xs font-mono flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              Academic Research
            </Badge>
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-mono border-accent/40 text-primary flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 animate-pulse" />
              {activeThesis.status}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {activeThesis.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono border-y border-border/60 py-3 my-4">
            <span>Author: <strong className="text-foreground">{activeThesis.authors.join(", ")}</strong></span>
            <span>•</span>
            <span>Institution: <strong className="text-foreground">{activeThesis.institution}</strong></span>
            <span>•</span>
            <span>Expected Release: <strong className="text-foreground">{activeThesis.targetPublication}</strong></span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button 
              onClick={handleCopyCitation}
              variant="outline" 
              className="rounded-full border-2 text-xs md:text-sm"
            >
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              {copiedCitation ? "Citation Copied!" : "Copy BibTeX Citation"}
            </Button>
            
            <a href="/Garvit_Chawla-Software_Engineer.pdf" download>
              <Button variant="outline" className="rounded-full border-2 text-xs md:text-sm">
                <Download className="h-4 w-4 mr-2" />
                Download Draft PDF
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Abstract Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 md:p-8 rounded-3xl border border-accent/30 bg-background/60 backdrop-blur-xl shadow-xl">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Abstract
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
              {activeThesis.abstract}
            </p>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
              <span className="text-xs font-mono font-semibold text-muted-foreground self-center mr-2">Keywords:</span>
              {activeThesis.keywords.map((kw, i) => (
                <Badge key={i} variant="secondary" className="rounded-full text-xs font-mono">
                  {kw}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Paper Sections Preview */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold">Research Overview & Sections</h2>

          {activeThesis.sections.map((sec, idx) => (
            <Card key={idx} className="p-6 rounded-2xl border bg-card/40 backdrop-blur-md">
              <h3 className="text-lg font-bold mb-2 text-primary font-mono">{sec.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {sec.content}
              </p>
            </Card>
          ))}
        </motion.div>

        {/* Upload Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg bg-card border border-border p-6 md:p-8 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2.5 mb-6">
                  <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Upload Research Paper</h3>
                    <p className="text-xs text-muted-foreground">Add a new academic thesis or pre-print to your portfolio</p>
                  </div>
                </div>

                <form onSubmit={handleAddThesis} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono font-semibold mb-1 block text-muted-foreground">Thesis Title *</label>
                    <Input 
                      required
                      placeholder="e.g. Scalable Multi-Agent Systems..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono font-semibold mb-1 block text-muted-foreground">Institution</label>
                      <Input 
                        placeholder="Chitkara University"
                        value={newInstitution}
                        onChange={(e) => setNewInstitution(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono font-semibold mb-1 block text-muted-foreground">Status</label>
                      <Input 
                        placeholder="In Progress / Published"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-semibold mb-1 block text-muted-foreground">Abstract *</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Brief overview of your research methodology and findings..."
                      value={newAbstract}
                      onChange={(e) => setNewAbstract(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-semibold mb-1 block text-muted-foreground">Keywords (comma separated)</label>
                    <Input 
                      placeholder="LangGraph, LLMs, Vector DBs"
                      value={newKeywords}
                      onChange={(e) => setNewKeywords(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-full"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="gradient-primary text-white rounded-full"
                    >
                      Publish Thesis
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default ThesisPage;
