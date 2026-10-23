/**
 * Utilidad de seguimiento y analítica de conversiones para Amarena Pastelería.
 * Registra eventos en window.dataLayer (Google Tag Manager / GA4) si están configurados
 * y emite eventos DOM personalizados 'amarena_conversion'.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface ConversionEventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

export const trackConversion = (action: string, params: ConversionEventParams = {}): void => {
  const eventData = {
    event: 'amarena_conversion',
    event_category: params.category || 'lead_generation',
    event_action: action,
    event_label: params.label || '',
    value: params.value ?? 1,
    timestamp: new Date().toISOString(),
  };

  // Google Tag Manager / GA4 push
  if (typeof window !== 'undefined') {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(eventData);
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: eventData.event_category,
        event_label: eventData.event_label,
        value: eventData.value,
      });
    }

    // Custom DOM event
    try {
      const customEvent = new CustomEvent('amarena_conversion', { detail: eventData });
      window.dispatchEvent(customEvent);
    } catch {
      // Ignorar en entornos antiguos
    }
  }
};
