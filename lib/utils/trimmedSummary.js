const trimmedSummary = (summary) => {
  const limit = summary.split(' ').length < 25
  return limit ? summary : summary.split(' ').splice(0, 25).join(' ') + '...'
}

export default trimmedSummary
