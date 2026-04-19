import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';

type Category = 'Feedback' | 'Bug' | 'Suggestion' | 'Other';
const CATEGORIES: Category[] = ['Feedback', 'Bug', 'Suggestion', 'Other'];
const FORMSPREE_URL = 'https://formspree.io/f/mlgwwbzd';
const COOLDOWN_MS = 60_000;

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const navigate = useNavigate();
  const { colors, spacing, typography } = useTheme();

  const [category, setCategory] = useState<Category>('Feedback');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);

  const isCoolingDown = cooldownUntil !== null && Date.now() < cooldownUntil;
  const canSubmit = message.trim().length > 0 && status !== 'sending' && !isCoolingDown;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus('sending');
    try {
      const payload: Record<string, string> = { category, message };
      if (email.trim()) payload.email = email.trim();

      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
        setCooldownUntil(Date.now() + COOLDOWN_MS);
        setMessage('');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const pageStyle: CSSProperties = {
    backgroundColor: 'transparent',
    paddingBottom: 80,
    minHeight: '100dvh',
  };

  const topBarStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.lg}px`,
    paddingTop: `max(${spacing.xl}px, env(safe-area-inset-top))`,
  };

  const titleStyle: CSSProperties = {
    fontSize: typography.titleMD.fontSize,
    fontWeight: typography.titleMD.fontWeight,
    color: colors.text,
    padding: `0 ${spacing.lg}px ${spacing.md}px`,
  };

  const formStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    padding: `0 ${spacing.lg}px`,
  };

  const labelStyle: CSSProperties = {
    fontSize: typography.label.fontSize,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    display: 'block',
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: `${spacing.md}px`,
    borderRadius: 10,
    border: `1px solid ${colors.inputBorder}`,
    backgroundColor: colors.inputBg,
    color: colors.text,
    fontSize: typography.bodyMD.fontSize,
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const taStyle: CSSProperties = {
    ...inputStyle,
    minHeight: 140,
    resize: 'vertical' as const,
    fontFamily: 'inherit',
  };

  const catRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap' as const,
    gap: spacing.sm,
  };

  const catBtnStyle = (active: boolean): CSSProperties => ({
    padding: `${spacing.sm}px ${spacing.lg}px`,
    borderRadius: 20,
    border: active ? `1px solid ${colors.accent}` : `1px solid ${colors.border}`,
    backgroundColor: active ? colors.accentBg : colors.chipBg,
    color: active ? colors.accent : colors.textSecondary,
    fontSize: typography.label.fontSize,
    fontWeight: active ? '600' : '400',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  });

  const submitBtnStyle: CSSProperties = {
    padding: `${spacing.md}px ${spacing.xl}px`,
    borderRadius: 14,
    border: 'none',
    backgroundColor: canSubmit ? colors.accent : colors.buttonDisabledBg,
    color: canSubmit ? '#fff' : colors.textMuted,
    fontSize: typography.label.fontSize,
    fontWeight: '600',
    cursor: canSubmit ? 'pointer' : 'not-allowed',
    transition: 'background-color 0.15s ease',
  };

  const feedbackStyle: CSSProperties = {
    textAlign: 'center',
    padding: `${spacing.md}px`,
    borderRadius: 10,
    fontSize: typography.bodyMD.fontSize,
    color: status === 'success' ? colors.green : colors.red,
    backgroundColor: status === 'success' ? colors.greenBg : colors.redBg,
  };

  return (
    <div style={pageStyle}>
      <div style={topBarStyle}>
        <button
          style={{
            background: 'none',
            border: `1px solid ${colors.border}`,
            borderRadius: 20,
            padding: `${spacing.sm}px ${spacing.md}px`,
            fontSize: 15,
            color: colors.text,
            cursor: 'pointer',
            backgroundColor: colors.chipBg,
          }}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <div style={titleStyle}>Contact / Feedback</div>

      <div style={formStyle}>
        <div>
          <label style={labelStyle}>Category</label>
          <div style={catRowStyle}>
            {CATEGORIES.map((c) => (
              <button key={c} style={catBtnStyle(category === c)} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Email (optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what's on your mind…"
            style={taStyle}
          />
        </div>

        {(status === 'success' || status === 'error') && (
          <div style={feedbackStyle}>
            {status === 'success'
              ? '✓ Message sent! Thanks for the feedback.'
              : '✗ Something went wrong. Please try again.'}
          </div>
        )}

        <button style={submitBtnStyle} onClick={handleSubmit} disabled={!canSubmit}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </div>
  );
}
