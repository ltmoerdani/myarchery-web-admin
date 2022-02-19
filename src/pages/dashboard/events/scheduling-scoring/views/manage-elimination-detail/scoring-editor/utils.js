function sumScoresList(list) {
  const sumReducer = (total, value) => {
    if (!value || (typeof value === "string" && value.toLowerCase() === "m")) {
      return total;
    }
    if (typeof value === "string" && value.toLowerCase() === "x") {
      return total + 10;
    }
    return total + value;
  };
  return list.reduce(sumReducer, 0);
}

function makeScoringPayload({ data, state }) {
  const members = state.map((member, index) => ({
    member_id: member.participant.member.id,
    scores: {
      shot: data[index].shot.map((rambahan) => ({ score: rambahan })),
      extraShot: data[index].extraShot,
    },
  }));
  //coba tanpa type?
  return { type: 2, members };
}

export { sumScoresList, makeScoringPayload };
