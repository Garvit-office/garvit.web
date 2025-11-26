import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart } from "lucide-react";

const Poetry = () => {
  const poems = [
    {
      title: "Digital Dreams",
      date: "November 2024",
      category: "Technology",
      content: `In circuits deep and code so bright,
Where algorithms dance through the night,
I find my voice in binary streams,
A poet lost in digital dreams.

The cursor blinks, a heartbeat's pace,
As words emerge from cyberspace,
Each keystroke echoes thoughts untold,
In languages both new and old.`,
      likes: 42
    },
    {
      title: "Midnight Musings",
      date: "October 2024",
      category: "Life",
      content: `The moon hangs low, a silver thread,
Weaving tales that must be said,
In silence deep, the world asleep,
My thoughts run wild, emotions deep.

Stars whisper secrets to the night,
Painting dreams in pale moonlight,
And in this hour, quiet and still,
I find the strength to climb each hill.`,
      likes: 38
    },
    {
      title: "Code and Coffee",
      date: "October 2024",
      category: "Student Life",
      content: `Morning breaks with coffee's steam,
Debugging last night's broken dream,
Lines of code and syntax errors,
Fighting bugs like modern warriors.

Deadlines loom, assignments wait,
But caffeine keeps me up 'til late,
Between the semicolons lost,
I calculate success's cost.`,
      likes: 56
    },
    {
      title: "Silicon Valley Sunrise",
      date: "September 2024",
      category: "Technology",
      content: `Sunrise paints the valley gold,
Stories of innovation told,
In every startup's daring dream,
In every revolutionary scheme.

The future's forged in labs so bright,
Where passion meets both code and might,
And I stand here, amazed to see,
The world that's meant to be.`,
      likes: 31
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            My <span className="text-gradient">Poetry</span>
          </h1>
          
          <p className="text-muted-foreground text-center mb-12 text-lg">
            Where code meets verse, and logic meets emotion
          </p>

          <div className="space-y-8">
            {poems.map((poem, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass p-8 rounded-3xl hover:shadow-xl transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">{poem.title}</h2>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {poem.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-accent" />
                          {poem.likes}
                        </span>
                      </div>
                    </div>
                    <Badge className="rounded-full">{poem.category}</Badge>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <pre className="whitespace-pre-wrap font-serif text-foreground/90 leading-relaxed bg-muted/30 p-6 rounded-2xl">
{poem.content}
                    </pre>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Card className="glass p-8 rounded-3xl">
              <p className="text-muted-foreground mb-4">
                Want to read more of my poetry?
              </p>
              <p className="text-sm text-muted-foreground">
                Follow me on social media for daily verses and creative musings
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Poetry;