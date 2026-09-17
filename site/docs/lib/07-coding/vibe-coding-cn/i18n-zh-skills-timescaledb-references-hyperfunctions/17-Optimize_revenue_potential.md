---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hyperfunctions.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceSha256: "05b6221af2cc12adc9bdb276b06af82863fd7bcdfe4a673a0ed0f7f1a69d2184"
pageSha256: "3358fe7c822cc1e76ddf30e8cdf0961ab5e4d07799573904684952ea3c8d745a"
contentMode: "local-full"
zh: ""
---

## Optimize revenue potential

Having all this data is great but how do you use it? Monitoring data is useful to check what
has happened, but how can you analyse this information to your advantage? This section explains
how to create a visualization that shows how you can maximize potential revenue.

### Set up your data for geospatial queries

To add geospatial analysis to your ride count visualization, you need geospatial data to work out which trips
originated where. As TimescaleDB is compatible with all Postgres extensions, use [PostGIS][postgis] to slice
data by time and location.

1.  Connect to your [Tiger Cloud service][in-console-editors] and add the PostGIS extension:

1. Add geometry columns for pick up and drop off locations:

1.  Convert the latitude and longitude points into geometry coordinates that work with PostGIS:

This updates 10,906,860 rows of data on both columns, it takes a while. Coffee is your friend.

### Visualize the area where you can make the most money

In this section you visualize a query that returns rides longer than 5 miles for
trips taken within 2 km of Times Square. The data includes the distance travelled and
is `GROUP BY` `trip_distance` and location so that Grafana can plot the data properly.

This enables you to see where a taxi driver is most likely to pick up a passenger who wants a longer ride,
and make more money.

1. **Create a geolocalization dashboard**

1. In Grafana, create a new dashboard that is connected to your Tiger Cloud service data source with a Geomap
      visualization.

1. In the `Queries` section, select `Code`, then select the Time series `Format`.

![Real-time analytics geolocation](https://assets.timescale.com/docs/images/use-case-rta-grafana-timescale-configure-dashboard.png)

1. To find rides longer than 5 miles in Manhattan, paste the following query:

You see a world map with a dot on New York.
   1. Zoom into your map to see the visualization clearly.

1. **Customize the visualization**

1. In the Geomap options, under `Map Layers`, click `+ Add layer` and select `Heatmap`.
     You now see the areas where a taxi driver is most likely to pick up a passenger who wants a
     longer ride, and make more money.

![Real-time analytics geolocation](https://assets.timescale.com/docs/images/use-case-rta-grafana-heatmap.png)

You have integrated Grafana with a Tiger Cloud service and made insights based on visualization of
your data.

===== PAGE: https://docs.tigerdata.com/tutorials/real-time-analytics-energy-consumption/ =====

**Examples:**

Example 1 (bash):
```bash
