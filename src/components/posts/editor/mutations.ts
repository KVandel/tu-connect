import { useToast } from "@/hooks/use-toast";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
  QueryFilters,
} from "@tanstack/react-query";
import { submitPost } from "@/components/posts/editor/actions";

import { PostsPage } from "@/lib/types";

export function useSubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed", "for-you"] };
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  newCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        description: "Post created! Haha!",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: `Failed to post. Sorry, I don't have a GOOGLE LEVEL server. Please be patient!`,
      });
    },
  });
  return mutation;
}
