def update_mastery(p_known:float, correct:bool, p_learn:float=.15, p_guess:float=.2, p_slip:float=.1)->float:
    """Single BKT update followed by learning transition."""
    if correct:
        posterior=(p_known*(1-p_slip))/(p_known*(1-p_slip)+(1-p_known)*p_guess)
    else:
        posterior=(p_known*p_slip)/(p_known*p_slip+(1-p_known)*(1-p_guess))
    return posterior + (1-posterior)*p_learn
