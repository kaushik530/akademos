"""scope concepts to individual learners

Revision ID: 20261003_scope_concepts_to_learners
Revises: 20261003_adaptive_student_fields
"""
from alembic import op
import sqlalchemy as sa

revision = "20261003_scope_concepts_to_learners"
down_revision = "20261003_adaptive_student_fields"
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.add_column("concepts", sa.Column("student_id", sa.UUID(), nullable=True))
    op.create_foreign_key("fk_concepts_student_id", "concepts", "students", ["student_id"], ["id"])
    op.create_index("ix_concepts_student_id", "concepts", ["student_id"], unique=False)
    op.drop_index("ix_concepts_concept_key", table_name="concepts")
    op.create_index("ix_concepts_concept_key", "concepts", ["concept_key"], unique=False)

def downgrade() -> None:
    op.drop_index("ix_concepts_concept_key", table_name="concepts")
    op.create_index("ix_concepts_concept_key", "concepts", ["concept_key"], unique=True)
    op.drop_index("ix_concepts_student_id", table_name="concepts")
    op.drop_constraint("fk_concepts_student_id", "concepts", type_="foreignkey")
    op.drop_column("concepts", "student_id")
