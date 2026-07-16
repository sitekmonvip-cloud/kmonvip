import { EventService } from "./eventService";
import { LeadService } from "./leadService";

export const DashboardService = {
  async getCardStats() {
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const last7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [whatsappToday, whatsapp7d, leadsTotal, leadsNovos, topSource] = await Promise.all([
      EventService.countByTypeSince("whatsapp_click", last24h),
      EventService.countByTypeSince("whatsapp_click", last7d),
      LeadService.countTotal(),
      LeadService.countByStatus("novo"),
      LeadService.topSource(30),
    ]);

    return {
      whatsappClicksToday: whatsappToday,
      whatsappClicks7d: whatsapp7d,
      leadsTotal,
      leadsNovos,
      topSource: topSource ?? "Direto",
    };
  },

  async getChartSeries(days: 7 | 30) {
    return EventService.getDailySeries(days);
  },
};
