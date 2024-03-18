export function caseChange(str) {
    let sepe = str.split("_");
    let ans = sepe.map((s) => {
        return s[0].toUpperCase() + s.substring(1);
    }).join(" ");
    return ans;
}