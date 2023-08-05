function matchingAlgorithm(
  willingnessToWorkOutdoors,
  willingnessToLearnHandsOnSkills,
  willingnessToWorkWithTechnology,
  currentAnnualSalaryEquivalent
) {
  let matchScore;
  let allMatches = [];
  let topThreeMatches = [];
  let normalisedWillingnessScores = {};

  //   normalise willingness scores between -1 and 1
  let normalisedWillingnessToWorkOutdoors = normaliseWillingnessScore(
    willingnessToWorkOutdoors
  );

  let normalisedWillingnessToLearnHandsOnSkills = normaliseWillingnessScore(
    willingnessToLearnHandsOnSkills
  );

  let normalisedWillingnessToWorkWithTechnology = normaliseWillingnessScore(
    willingnessToWorkWithTechnology
  );

  normalisedWillingnessScores["outdoorsExtent"] =
    normalisedWillingnessToWorkOutdoors;
  normalisedWillingnessScores["handsOnExtent"] =
    normalisedWillingnessToLearnHandsOnSkills;
  normalisedWillingnessScores["technologyExtent"] =
    normalisedWillingnessToWorkWithTechnology;

  console.log(normalisedWillingnessScores);
  //   console.log(normalisedWillingnessToWorkOutdoors);

  fetch("./role-data.json")
    .then((response) => response.json())
    .then((json) => {
      //   console.log(json);

      // loop through jobs in json data
      for (let i = 0; i < json.length; i++) {
        if (json[i]["salaryRange"]["low"] >= currentAnnualSalaryEquivalent) {
          //  loop through willingness object
          for (let willingnessExtent in normalisedWillingnessScores) {
            // if user rated willingness score is greater than score on role data
            if (
              normalisedWillingnessScores[willingnessExtent] >
              json[i][willingnessExtent]
            ) {
              // push match to matches array if it doesn't already exist
              allMatches.indexOf(json[i].name) === -1
                ? allMatches.push(json[i].name)
                : console.log(`${json[i].name} has already been matched`);
            }
          }
        }
      }
      console.log(allMatches);
    })
    .catch(console.error);
}

function normaliseWillingnessScore(score) {
  const minimumValue = 1;
  const maximumValue = 5;
  return 2 * ((score - minimumValue) / (maximumValue - minimumValue)) - 1;
}

matchingAlgorithm(4, 2, 1, 21901);
