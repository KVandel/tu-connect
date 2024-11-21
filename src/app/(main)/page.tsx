import PostEditor from "@/components/posts/editor/PostEditor";

import TrendsSidebar, {
  TrendingTopics,
  WhoToFollow,
} from "@/components/TrendsSidebar";
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
            <TabsTrigger value="for-you">For you</TabsTrigger>

            <TabsTrigger value="following">Following</TabsTrigger>

            <TabsTrigger value="trends" className="block lg:hidden">
              Trends
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
          <TabsContent value="trends" className="">
            <>
              <WhoToFollow />
              <TrendingTopics />
            </>
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden lg:block">
        <TrendsSidebar />
      </div>
    </main>
  );
}
