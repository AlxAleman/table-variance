  //varianceChart start
  var capabilities = document.querySelectorAll(".capability");
var overall_questions_answered = [];
var overall_questions_not_answered = [];
var total_score = [];
var divisor_array = [];
var question_scores = [];
var pillar_scores = [];
var i = 0;

console.log(capabilities);

capabilities.forEach(function (capability, index) {
  console.log(">>>");
  
  // Get Capability heading and questions for each
  var text = capability.querySelector(".text").textContent;
  var questions = capability.querySelectorAll(".question");

  // Set variable for how many questions the user has answered in the capability
  var capability_questions_not_answered = [];

  // Set variable for the sum of all questions answered in a capability
  var capability_questions_answered = [];

  // Loop through each question in a capability
  questions.forEach(function (question, index) {
    var score = parseFloat(question.querySelector(".score").textContent, 10).toFixed(2);

    var benchmark = parseFloat(question.querySelector(".benchmark").textContent);
    var variance_space = question.querySelector(".variance");
    var variance_score_cell = question.querySelector(".variance-total");

    var benchmark_minus_score = score - benchmark;

    if (score > 0) {
      question_scores.push(score);

      var isNegative = parseFloat(benchmark_minus_score).toFixed(1) < 0;

      if (parseFloat(score) > 0 && parseFloat(score) < 1.5) {
        question.querySelector(".score").classList.add("red");
      } else if (parseFloat(score) >= 1.5 && parseFloat(score) < 3.5) {
        question.querySelector(".score").classList.add("orange");
      } else if (parseFloat(score) >= 3.5 && parseFloat(score) <= 5) {
        question.querySelector(".score").classList.add("green");
      }

      variance_space.innerHTML =
        '<div class="variance-bar"><div class="wrap"><div class="negative"><span class="scoreSpan"></span></div><div class="positive"><span class="scoreSpan"></span></div></div></div>';
      variance_score_cell.innerHTML = '<div class="variance-score">' + benchmark_minus_score.toFixed(2) + '</div>';

      if (isNegative) {
        variance_space
          .querySelector(".negative")
          .classList.add("active");
        variance_space
          .querySelector("div.negative.active > span")
          .style.width = Math.abs(benchmark_minus_score) * 20 + "%";
      } else {
        variance_space
          .querySelector(".positive")
          .classList.add("active");
        variance_space
          .querySelector("div.positive.active > span")
          .style.width = Math.abs(benchmark_minus_score) * 20 + "%";
      }

      overall_questions_answered.push(score);
    } else {
      variance_space.innerHTML =
        '<div class="variance-bar"><div class="wrap"><div class="negative"></div><div class="positive"><span class="scoreSpan"></span></div></div></div>';
      variance_score_cell.innerHTML =
       '<div class="variance-score">N/A</div>';
      overall_questions_not_answered.push(score);
    }

    if (score === "0.00") {
      capability_questions_not_answered.push(score);
    } else {
      capability_questions_answered.push(score);
    }
  });

  // Go through each capability and find out how many answered on each
  var capability_divisor_int =
    questions.length - capability_questions_not_answered.length;

  var sum_of_cap_questions_answered = capability_questions_answered.reduce(
    function (a, b) {
      return a + b;
    },
    0
  );

  var cap_final_math =
    sum_of_cap_questions_answered / capability_questions_answered.length;

  //Insert Capability Rows
  // var capability_row = document.querySelector(".capability-table").querySelectorAll(".capability-insert")[i];
  // var capability_row_score = capability_row.querySelector(".score");

  // capability_row_score.textContent = cap_final_math.toFixed(2);

  i++;
});

  //varinanceChart ends