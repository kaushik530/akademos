def priority(mastery_gap:float, prerequisite_criticality:float, goal_relevance:float, importance:float, forgetting_risk:float, resource_relevance:float, weights=(1,1,1,1,1,1)):
    values=(mastery_gap,prerequisite_criticality,goal_relevance,importance,forgetting_risk,resource_relevance)
    return sum(v*w for v,w in zip(values,weights))
