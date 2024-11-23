import { motion } from "framer-motion";


const NewsletterPage = () => {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <motion.section 
          className="relative h-[300px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src=""
            alt="Newsletter Background"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="container relative flex h-full items-center">
            <motion.h1 
              className="text-5xl font-bold text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Newsletter
            </motion.h1>
          </div>
        </motion.section>
  
        {/* Main Content */}
        <main className="container mx-auto py-12">
          {/* Trending News */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="mb-8 text-2xl font-bold">Trending News</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * i, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src=""
                      alt="News thumbnail"
                      className="w-[150px] h-[100px] rounded-lg object-cover"
                    />
                    <div>
                      <span className="text-sm text-muted-foreground">June 15, 2023</span>
                      <h3 className="line-clamp-2 text-lg font-semibold">News Headline {i}</h3>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        Brief description of the news article goes here...
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Featured Article */}
              <motion.div 
                className="overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-[400px]">
                  <img
                    src=""
                    alt="Cycling"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <span className="mb-2 inline-block rounded bg-primary px-2 py-1 text-xs">
                      Cycling
                    </span>
                    <h3 className="mb-2 text-2xl font-bold">
                      DISCOVER THE MEMBER BENEFITS OF USA CYCLING!
                    </h3>
                    <p className="text-sm">01 June 2023</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
  
          {/* Startup Articles */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="mb-8 text-2xl font-bold">Startup Article</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                "Basketball",
                "Ice Hockey",
                "Badminton"
              ].map((sport, i) => (
                <motion.div 
                  key={i}
                  className="overflow-hidden rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i + 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative h-[200px]">
                    <img
                      src=""
                      alt={sport}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <img
                        src=""
                        alt="Author"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium">Author Name</span>
                    </div>
                    <span className="text-sm text-muted-foreground">01 June 2023</span>
                    <h3 className="mt-2 text-lg font-semibold">
                      Article about {sport}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      Brief description of the article goes here...
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>
      </div>
    );
  };
  
  export default NewsletterPage;