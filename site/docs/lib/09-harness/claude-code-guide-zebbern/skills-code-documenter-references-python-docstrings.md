---
title: "Python Docstrings"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/code-documenter/references/python-docstrings.md"
sourceRel: "skills/code-documenter/references/python-docstrings.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/code-documenter/references/python-docstrings.md"
sourceSha256: "508c566128daed4d9437ee6dfdcbf2f0534f9a90a4de1096bad6cf019dd3ebcd"
pageSha256: "508c566128daed4d9437ee6dfdcbf2f0534f9a90a4de1096bad6cf019dd3ebcd"
contentMode: "local-full"
zh: ""
---

# Python Docstrings

## Google Style (Recommended)

```python
def calculate_total(items: list[Item], tax_rate: float = 0.0) -> float:
    """Calculate total cost including tax.

    Args:
        items: List of items to calculate total for.
        tax_rate: Tax rate as decimal (e.g., 0.08 for 8%).

    Returns:
        Total cost including tax.

    Raises:
        ValueError: If tax_rate is negative or items is empty.

    Example:
        >>> calculate_total([Item(10), Item(20)], 0.1)
        33.0
    """
```

## NumPy Style

```python
def calculate_total(items: list[Item], tax_rate: float = 0.0) -> float:
    """
    Calculate total cost including tax.

    Parameters
    ----------
    items : list[Item]
        List of items to calculate total for.
    tax_rate : float, optional
        Tax rate as decimal (e.g., 0.08 for 8%). Default is 0.0.

    Returns
    -------
    float
        Total cost including tax.

    Raises
    ------
    ValueError
        If tax_rate is negative or items is empty.

    Examples
    --------
    >>> calculate_total([Item(10), Item(20)], 0.1)
    33.0
    """
```

## Sphinx Style

```python
def calculate_total(items: list[Item], tax_rate: float = 0.0) -> float:
    """Calculate total cost including tax.

    :param items: List of items to calculate total for.
    :type items: list[Item]
    :param tax_rate: Tax rate as decimal (e.g., 0.08 for 8%).
    :type tax_rate: float
    :returns: Total cost including tax.
    :rtype: float
    :raises ValueError: If tax_rate is negative or items is empty.

    .. code-block:: python

        >>> calculate_total([Item(10), Item(20)], 0.1)
        33.0
    """
```

## Class Documentation

```python
class UserService:
    """Service for managing user operations.

    This service handles CRUD operations for users and
    integrates with the authentication system.

    Attributes:
        db: Database session for queries.
        cache: Redis client for caching.

    Example:
        >>> service = UserService(db, cache)
        >>> user = await service.create_user(data)
    """

    def __init__(self, db: AsyncSession, cache: Redis) -> None:
        """Initialize UserService.

        Args:
            db: Database session for queries.
            cache: Redis client for caching.
        """
```

## Quick Reference

| Style  | Args Format          | Returns Format    |
| ------ | -------------------- | ----------------- |
| Google | `Args:` block        | `Returns:` block  |
| NumPy  | `Parameters` section | `Returns` section |
| Sphinx | `:param name:`       | `:returns:`       |

## Sections Available

| Section    | Google        | NumPy        | Sphinx            |
| ---------- | ------------- | ------------ | ----------------- |
| Parameters | `Args:`       | `Parameters` | `:param:`         |
| Returns    | `Returns:`    | `Returns`    | `:returns:`       |
| Raises     | `Raises:`     | `Raises`     | `:raises:`        |
| Examples   | `Example:`    | `Examples`   | `.. code-block::` |
| Notes      | `Note:`       | `Notes`      | `.. note::`       |
| Attributes | `Attributes:` | `Attributes` | `:ivar:`          |
