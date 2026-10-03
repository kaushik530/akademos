from dotenv import load_dotenv
load_dotenv()
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app=FastAPI(title='Akademos API',version='1.0.0')
origins=[x.strip() for x in os.getenv('CORS_ORIGINS','http://localhost:5173').split(',') if x.strip()]
app.add_middleware(CORSMiddleware,allow_origins=origins,allow_credentials=True,allow_methods=['*'],allow_headers=['*'])
app.include_router(router,prefix='/api')
@app.get('/health')
def health(): return {'status':'ok','service':'akademos-api'}
