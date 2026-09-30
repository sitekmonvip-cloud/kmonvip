import { buildLlmsTxt, llmsResponse } from "@/lib/seo/llms";
import { BlogService } from "@/lib/crm/blogService";

export async function GET() {
  // The page list comes from code; only the blog section needs the DB, so an outage just drops it.
  const posts = await BlogService.listPublished().catch((err) => {
    console.error("[llms] blog posts unavailable", err);
    return [];
  });
  return llmsResponse(buildLlmsTxt({ full: true, posts }));
}
