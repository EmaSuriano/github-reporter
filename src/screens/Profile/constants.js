const DEFAULT_OPTIONS = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: "left",
    labels: {
      usePointStyle: true,
      fontColor: "white",
      fontSize: 12,
      padding: 15,
      boxWidth: 12
    }
  },
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

export const CHART_SM_CONFIGURATION = {
  height: 300,
  width: 400,
  options: DEFAULT_OPTIONS
};

export const CHART_LG_CONFIGURATION = {
  height: 400,
  width: 600,
  options: DEFAULT_OPTIONS
};

export const MIN_LANGUAGES = 1;
