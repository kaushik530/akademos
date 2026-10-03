from neo4j import GraphDatabase
class Neo4jClient:
    def __init__(self, uri:str, username:str, password:str): self.driver=GraphDatabase.driver(uri,auth=(username,password))
    def close(self): self.driver.close()
    def run(self, query:str, **params):
        with self.driver.session() as session: return list(session.run(query, **params))
