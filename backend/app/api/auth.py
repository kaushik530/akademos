from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas import (
    SignupRequest,
    LoginRequest,
    AuthResponse,
    UserResponse,
)
from app.services.auth_service import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

security = HTTPBearer()


@router.post("/signup", response_model=AuthResponse)
def signup(
    payload: SignupRequest,
    db: Session = Depends(get_db)
):

    email = payload.email.strip().lower()

    # Check whether email already exists
    existing_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists."
        )

    # Create user
    user = User(
        name=payload.name.strip(),
        email=email,
        password_hash=hash_password(payload.password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    # Create JWT
    token = create_access_token(user.id)

    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=user
    )


@router.post("/login", response_model=AuthResponse)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):

    email = payload.email.strip().lower()

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    # Don't reveal whether email exists
    if not user or not verify_password(
        payload.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    token = create_access_token(user.id)

    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=user
    )


@router.get("/me", response_model=UserResponse)
def get_me(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    try:
        user_id = decode_access_token(token)

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token."
        )

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found."
        )

    return user