"""add adaptive learner fields
Revision ID: 20261003_adaptive_student_fields
Revises: e97f00a94331
"""
from alembic import op
import sqlalchemy as sa
revision='20261003_adaptive_student_fields'
down_revision='e97f00a94331'
branch_labels=None
depends_on=None

def upgrade():
    op.add_column('students', sa.Column('target_proficiency', sa.Integer(), nullable=False, server_default='3'))
    op.add_column('students', sa.Column('study_days', sa.String(length=50), nullable=False, server_default='0,1,2,3,4'))

def downgrade():
    op.drop_column('students','study_days')
    op.drop_column('students','target_proficiency')
