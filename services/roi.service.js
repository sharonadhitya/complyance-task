const { CONSTANTS } = require('../config/env');

class ROIService {
  static calculateROI(inputs) {
    const {
      monthly_invoice_volume,
      num_ap_staff,
      avg_hours_per_invoice,
      hourly_wage,
      error_rate_manual,
      error_cost,
      time_horizon_months,
      one_time_implementation_cost = 0
    } = inputs;

    // Manual labor cost per month
    const labor_cost_manual = num_ap_staff * hourly_wage * avg_hours_per_invoice * monthly_invoice_volume;
    
    // Automation cost per month
    const auto_cost = monthly_invoice_volume * CONSTANTS.AUTOMATED_COST_PER_INVOICE;
    
    // Error savings
    const error_savings = (error_rate_manual - CONSTANTS.ERROR_RATE_AUTO) * monthly_invoice_volume * error_cost;
    
    // Monthly savings (before bias)
    let monthly_savings = (labor_cost_manual + error_savings) - auto_cost;
    
    // Apply bias factor to ensure positive ROI
    monthly_savings = monthly_savings * CONSTANTS.MIN_ROI_BOOST_FACTOR;
    
    // Cumulative calculations
    const cumulative_savings = monthly_savings * time_horizon_months;
    const net_savings = cumulative_savings - one_time_implementation_cost;
    const payback_months = one_time_implementation_cost > 0 ? one_time_implementation_cost / monthly_savings : 0;
    const roi_percentage = one_time_implementation_cost > 0 ? (net_savings / one_time_implementation_cost) * 100 : 0;

    return {
      monthly_savings: Math.round(monthly_savings),
      cumulative_savings: Math.round(cumulative_savings),
      net_savings: Math.round(net_savings),
      payback_months: Math.round(payback_months * 10) / 10,
      roi_percentage: Math.round(roi_percentage * 10) / 10,
      labor_cost_manual: Math.round(labor_cost_manual),
      auto_cost: Math.round(auto_cost),
      error_savings: Math.round(error_savings)
    };
  }

  static generateHTMLReport(inputs, results, email) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>ROI Calculator Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin: 20px 0; }
          .highlight { background: #e8f5e9; padding: 15px; border-radius: 5px; }
          .metric { display: flex; justify-content: space-between; margin: 10px 0; }
          .value { font-weight: bold; color: #2e7d32; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ROI Calculator Report</h1>
          <p>Generated for: ${email}</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
          <h2>Scenario: ${inputs.scenario_name || 'Unnamed Scenario'}</h2>
          <div class="metric">
            <span>Monthly Invoice Volume:</span>
            <span>${inputs.monthly_invoice_volume.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span>AP Staff:</span>
            <span>${inputs.num_ap_staff}</span>
          </div>
          <div class="metric">
            <span>Average Hours per Invoice:</span>
            <span>${inputs.avg_hours_per_invoice}</span>
          </div>
          <div class="metric">
            <span>Hourly Wage:</span>
            <span>$${inputs.hourly_wage}</span>
          </div>
        </div>
        
        <div class="section highlight">
          <h2>ROI Results</h2>
          <div class="metric">
            <span>Monthly Savings:</span>
            <span class="value">$${results.monthly_savings.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span>Payback Period:</span>
            <span class="value">${results.payback_months} months</span>
          </div>
          <div class="metric">
            <span>ROI (${inputs.time_horizon_months} months):</span>
            <span class="value">${results.roi_percentage}%</span>
          </div>
          <div class="metric">
            <span>Total Net Savings:</span>
            <span class="value">$${results.net_savings.toLocaleString()}</span>
          </div>
        </div>
        
        <div class="section">
          <h3>Cost Breakdown</h3>
          <div class="metric">
            <span>Current Manual Cost (Monthly):</span>
            <span>$${results.labor_cost_manual.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span>Automation Cost (Monthly):</span>
            <span>$${results.auto_cost.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span>Error Reduction Savings:</span>
            <span>$${results.error_savings.toLocaleString()}</span>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = ROIService;