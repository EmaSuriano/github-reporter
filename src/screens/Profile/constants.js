export const DEFAULT_OPTIONS = {
  legend: {
    position: window.innerWidth < 600 ? "bottom" : "left",
    labels: {
      fontSize: window.innerWidth < 600 ? 10 : 12,
      padding: window.innerWidth < 600 ? 8 : 10,
      boxWidth: window.innerWidth < 600 ? 10 : 12
    }
  },
  /* legend: {
    position: "bottom",
    labels: {
      usePointStyle: true,
      fontSize: 12,
      padding: 15,
      boxWidth: 12
    }
  }, */
  tooltips: {
    enabled: true
  }
};

export const DEFAULT_COLORS = [
  "#A4BDFC",
  "#7AE7BF",
  "#DBADFF",
  "#FF887C",
  "#FBD75B",
  "#FFB878",
  "#46D6DB",
  "#E1E1E1",
  "#5484ED",
  "#51B749",
  "#DC2127"
];

export const CHART_SM = {
  height: 300,
  width: 400
};

export const CHART_LG = {
  height: 400,
  width: 600
};

export const MIN_LANGUAGES = 1;
export const NO_RESULTS_FOUND = "No Results Found";
