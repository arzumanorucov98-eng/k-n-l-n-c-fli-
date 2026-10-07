import Link from 'next/link';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
      <div>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: 'var(--space-1)' }}>
          {title}
        </h2>
        {description && (
          <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link href={action.href} className="btn btn-accent btn-sm">
          {action.label}
        </Link>
      )}
    </div>
  );
}
