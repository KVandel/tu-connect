import PostEditor from "@/components/posts/editor/PostEditor";

import TrendsSidebar from "@/components/TrendsSidebar";
import ForYouFeed from "@/app/(main)/ForYouFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "@/app/(main)/FollowingFeed";

export default function Home() {
  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Tabs defaultValue="for-you">
          <TabsList>
            <div className="flex-1  text-center ">
              <TabsTrigger
                value="for-you"
                className="py-3 px-5 text-center rounded-lg"
              >
                For you
              </TabsTrigger>
            </div>
            <div className="flex-1 text-center ">
              <TabsTrigger
                value="following"
                className="py-3 px-5 text-center rounded-lg"
              >
                Following
              </TabsTrigger>
            </div>
            <div className="block lg:hidden flex-1 text-center">
              <TabsTrigger
                value="trends"
                className="py-3 px-5 text-center rounded-lg"
              >
                Trends
              </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
          <TabsContent value="trends">
            <div className="block lg:hidden">
              <TrendsSidebar />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden lg:block">
        <TrendsSidebar />
      </div>
    </main>
  );
}
