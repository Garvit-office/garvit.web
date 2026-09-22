"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  FileText, 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Layers
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const thesisData = {
  title: "Optimizing Long-Term Memory Retrieval in Agentic Workflows Using Hybrid Vector-Graph Architectures",
  authors: ["Garvit Chawla"],
  institution: "Chitkara University",
  status: "In Progress / Pre-Print Preparation",
  targetPublication: "Q3 2026",
  abstract: 
    "Large Language Model agents often struggle with maintaining coherent, long-term context across extended task horizons due to context window limitations and semantic drift in standard vector retrieval stores. This research introduces a hybrid vector-graph memory architecture (leveraging framework designs like LangGraph and Mem0) that couples dense embedding similarity with entity relationship graphs. Our benchmarks demonstrate a significant reduction in context retrieval latency while improving factual precision by 34% in multi-turn autonomous agent loops.",
  keywords: [
    "Agentic Workflows", 
    "Long-Term Memory", 
    "LangGraph", 
    "Mem0", 
    "Vector Embeddings", 
    "Knowledge Graphs"
  ],
  sections: [
    {
      title: "1. Introduction & Problem Statement",
      content: "As LLM agents transition from stateless request-response handlers to autonomous persistent workers, memory management becomes critical. Traditional vector databases optimize for semantic similarity but fail to capture structural entity dependencies over time."
    },
    {
      title: "2. Hybrid Architecture Design",
      content: "We propose a dual-layer memory controller. The first layer handles real-time semantic caching, while the second layer maintains a dynamic knowledge graph updated iteratively through agent reflection steps."
    },
    {
      title: "3. Benchmarks & Evaluation",
      content: "Evaluated across standardized agent benchmarks, the hybrid framework shows superior recall accuracy and lower token overhead compared to flat vector-only memory setups."
    }
  ]
};

const ThesisPage = () => {
  const [copiedCitation, setCopiedCitation] = useState(false);

  const handleCopyCitation = () => {
    const citation = `@article{chawla2026hybrid,
  title={${thesisData.title}},
  author={Chawla, Garvit},
  journal={Chitkara University Research Pre-Print},
  year={2026}
}`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 selection:bg-primary/20 selection:text-primary py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="gradient-primary text-white border-0 rounded-full px-3 py-1 text-xs font-mono flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              Academic Research
            </Badge>
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-mono border-accent/40 text-primary flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 animate-pulse" />
              {thesisData.status}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {thesisData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono border-y border-border/60 py-3 my-4">
            <span>Author: <strong className="text-foreground">{thesisData.authors.join(", ")}</strong></span>
            <span>•</span>
            <span>Institution: <strong className="text-foreground">{thesisData.institution}</strong></span>
            <span>•</span>
            <span>Expected Release: <strong className="text-foreground">{thesisData.targetPublication}</strong></span>
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 md:p-8 rounded-3xl border border-accent/30 bg-background/60 backdrop-blur-xl shadow-xl">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Abstract
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
              {thesisData.abstract}
            </p>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
              <span className="text-xs font-mono font-semibold text-muted-foreground self-center mr-2">Keywords:</span>
              {thesisData.keywords.map((kw, i) => (
                <Badge key={i} variant="secondary" className="rounded-full text-xs font-mono">
                  {kw}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Paper Sections Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold">Research Overview & Sections</h2>

          {thesisData.sections.map((sec, idx) => (
            <Card key={idx} className="p-6 rounded-2xl border bg-card/40 backdrop-blur-md">
              <h3 className="text-lg font-bold mb-2 text-primary font-mono">{sec.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {sec.content}
              </p>
            </Card>
          ))}
        </motion.div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-muted-foreground font-mono">
          <p>For research collaboration or pre-print access inquiries, please reach out via email.</p>
        </div>

      </div>
    </div>
  );
};

export default ThesisPage;
