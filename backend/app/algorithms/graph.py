from collections import deque
def bfs(graph:dict[str,list[str]], start:str)->list[str]:
    seen={start}; q=deque([start]); out=[]
    while q:
        n=q.popleft(); out.append(n)
        for nxt in graph.get(n,[]):
            if nxt not in seen: seen.add(nxt); q.append(nxt)
    return out
