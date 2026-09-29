import { buildLlmsTxt, llmsResponse } from "@/lib/seo/llms";
import { BlogService } from "@/lib/crm/blogService";

export async function GET() {
  const posts = await BlogService.listPublished();
  return llmsResponse(buildLlmsTxt({ full: false, posts }));
}
