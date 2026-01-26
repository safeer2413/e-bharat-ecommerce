import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  safelist: [
    "hover:bg-red-500",
    "hover:bg-blue-700",
    "hover:bg-cyan-600",
    "hover:bg-black",
    "hover:bg-gradient-to-tr hover:from-[#833AB4] hover:via-[#E4405F] hover:to-[#F77737]"
  ],


  theme: {
    extend: {},
  },
  plugins: [],
});
