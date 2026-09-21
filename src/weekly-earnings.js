import { insertHeader, insertFooter, insertHead, insertNavButtons } from "./utils/page-layout.js";
import { readData } from "./utils/read-data.js";
import { insertValue } from "./utils/insert-value.js";
import { latest_year, updateYearSpans, first_year, last_year } from "./utils/update-years.js";
import { config } from "./config/config.js";
import { insertExpandButtons } from "./utils/expand-buttons.js";
import { downloadButton } from "./utils/download-button.js";
import { dateFormat } from "./utils/date-format.js";
import { populateInfoBoxes } from "./utils/info-boxes.js";
import { initCookieConsent } from "./utils/cookies.js";
import { lineChart } from "./charts/line-chart.js";
import { plotMap } from "./charts/plot-map.js";

window.addEventListener("DOMContentLoaded", async () => {

    initCookieConsent();
    await insertHead("Weekly earnings");
    insertHeader();
    insertNavButtons();
    insertFooter();
    insertExpandButtons();

    // Insert values into page cards below

    // Content for card 1

    const [GHWPLGD_data, GHWPLGD_meta] = await readData("GHWPLGD");
    updateYearSpans(GHWPLGD_data, GHWPLGD_meta);

    const card_1_raw = GHWPLGD_data
        .filter(row => row["Statistic"] == "Median Wage" &&
row["Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland" &&
row["Pay Rate"] == "Weekly" &&
row["Working Pattern"] == "Full-Time")
        .map(col => col["All Persons"])[0];

    // BuildR display value: 713.1
    const card_1_value = card_1_raw.toFixed(1);
    insertValue("card-1-value", card_1_value);


    // Content for card 2

    const card_2_raw = GHWPLGD_data
        .filter(row => row["Statistic"] == "Median Wage" &&
row["Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland" &&
row["Pay Rate"] == "Weekly" &&
row["Working Pattern"] == "Part-Time")
        .map(col => col["All Persons"])[0];

    // BuildR display value: 272.2
    const card_2_value = card_2_raw.toFixed(1);
    insertValue("card-2-value", card_2_value);


    // Content for card 3

    const card_3_raw = GHWPLGD_data
        .filter(row => row["Statistic"] == "Median Wage" &&
row["Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland" &&
row["Pay Rate"] == "Weekly" &&
row["Working Pattern"] == "Full-Time")
        .map(col => col["Females"])[0];

    // BuildR display value: 678
    const card_3_value = card_3_raw;
    insertValue("card-3-value", card_3_value);


    // Content for card 4

    const card_4_raw = GHWPLGD_data
        .filter(row => row["Statistic"] == "Median Wage" &&
row["Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland" &&
row["Pay Rate"] == "Weekly" &&
row["Working Pattern"] == "Part-Time")
        .map(col => col["Females"])[0];

    // BuildR display value: 284.4
    const card_4_value = card_4_raw.toFixed(1);
    insertValue("card-4-value", card_4_value);


    // Content for card 5

    const card_5_raw = GHWPLGD_data
        .filter(row => row["Statistic"] == "Median Wage" &&
row["Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland" &&
row["Pay Rate"] == "Weekly" &&
row["Working Pattern"] == "Full-Time")
        .map(col => col["Males"])[0];

    // BuildR display value: 742.5
    const card_5_value = card_5_raw.toFixed(1);
    insertValue("card-5-value", card_5_value);


    // Content for card 6

    const card_6_raw = GHWPLGD_data
        .filter(row => row["Statistic"] == "Median Wage" &&
row["Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland" &&
row["Pay Rate"] == "Weekly" &&
row["Working Pattern"] == "Part-Time")
        .map(col => col["Males"])[0];

    // BuildR display value: 240.0
    const card_6_value = card_6_raw.toFixed(1);
    insertValue("card-6-value", card_6_value);


    // End page card content

    // Insert chart content below

    // Content for chart 1
    // BuildR chart type: line
    // BuildR matrix: GHWPLGD

    // BuildR line chart config start
    let line_chart_1_years = GHWPLGD_data
        .map(col => col["Year"]);

    line_chart_1_years = [...new Set(line_chart_1_years)];

    const line_chart_1_lines = [
        GHWPLGD_data
            .filter(row => line_chart_1_years.includes(row["Year"]) &&
                row["Statistic"] == "Median Wage" &&
                row["Local Government District"] == "Northern Ireland" &&
                row["Pay Rate"] == "Weekly" &&
                row["Working Pattern"] == "Full-Time")
            .map(col => col["All Persons"]),

        GHWPLGD_data
            .filter(row => line_chart_1_years.includes(row["Year"]) &&
                row["Statistic"] == "Median Wage" &&
                row["Local Government District"] == "Northern Ireland" &&
                row["Pay Rate"] == "Weekly" &&
                row["Working Pattern"] == "Full-Time")
            .map(col => col["Females"]),

        GHWPLGD_data
            .filter(row => line_chart_1_years.includes(row["Year"]) &&
                row["Statistic"] == "Median Wage" &&
                row["Local Government District"] == "Northern Ireland" &&
                row["Pay Rate"] == "Weekly" &&
                row["Working Pattern"] == "Full-Time")
            .map(col => col["Males"])
    ];

    const line_chart_1_labels = ["All employees", "Females", "Males"];

    lineChart({
        years: line_chart_1_years,
        lines: line_chart_1_lines,
        labels: line_chart_1_labels,
        unit: "",
        canvas_id: "line-canvas-1",
        expanded_canvas_id: "line-canvas-1-expanded",
        showPoints: true
    });

    const line_chart_1_query = {
        "Statistic": "Median Wage",
        "Local Government District": "Northern Ireland",
        "Pay Rate": "Weekly",
        "Working Pattern": "Full-Time",
        "Sex": ["All Persons", "Females", "Males"]
    };

    downloadButton(
        "chart-1-capture",
        "GHWPLGD",
        dateFormat(GHWPLGD_meta.updated),
        line_chart_1_query
    );
    // BuildR line chart config end


    // Content for chart 2
    // BuildR chart type: map
    // BuildR matrix: GHWPLGD

    // BuildR map chart config start
    const map_chart_2_data = GHWPLGD_data
        .filter(row => row["Statistic"] == "Median Wage" &&
                       row["Year"] == latest_year &&
                       row["Pay Rate"] == "Weekly" &&
                       row["Working Pattern"] == "Full-Time" &&
                       row["Local Government District"] != "Northern Ireland");

    plotMap({
        elementId: "map-container-2",
        legendId: "map-legend-2",
        data: map_chart_2_data,
        meta: GHWPLGD_meta,
        area: "Local Government District",
        value: "All Persons"
    });

    const map_chart_2_query = {
        "Statistic": "Median Wage",
        "Year": latest_year,
        "Pay Rate": "Weekly",
        "Working Pattern": "Full-Time",
        "Sex": "All Persons"
    };

    downloadButton(
        "chart-2-capture",
        "GHWPLGD",
        dateFormat(GHWPLGD_meta.updated),
        map_chart_2_query,
        "map"
    );
    // BuildR map chart config end

    // End chart content

    // BuildR info boxes start
    populateInfoBoxes(
        [
            "Definitions",
            "Source",
            "What does the data mean?"
        ],
        [
            // DEFINITIONS BOX
            ``,

            // SOURCE BOX
            ``,

            // DATA MEANING BOX
            ``
        ]
    );
    // BuildR info boxes end


})
