const getAccleartion = (object) =>
  "f" in object && "m" in object && object.m !== 0
    ? object.f / object.m
    : "Δv" in object && "Δt" in object && object.Δt !== 0
      ? object.Δv / object.Δt
      : "d" in object && "t" in object && object.t !== 0
        ? (object.d * 2) / object.t ** 2
        : "Impossible";