(function (d) {
    'use strict';

    var yearField = d.getElementById('dob-year'),
        monthField = d.getElementById('dob-month'),
        dayField = d.getElementById('dob-day'),
        submitButton = d.getElementById('dob-submit'),
        cancelButton = d.getElementById('dob-cancel'),
        resultElement = d.getElementById('result'),
        resultContainer = d.getElementById('result-container'),
        moreLinkElement = d.getElementById('more-link'),
        moreContainerElement = d.getElementById('more-container'),
        currentYear = (new Date()).getFullYear(),
        todayUnixTime = Math.round((new Date()).getTime() / 1000),
        dob = new Date(),
        unitLabels = {
          'unit-weeks': {
            'relativity' : 604800,
            'label' : 'Weeks'
          },
          'unit-hours': {
            'relativity' : 3600,
            'label' : 'Hours'
          },
          'unit-minutes': {
            'relativity' : 60,
            'label' : 'Minutes'
          },
          'unit-seconds': {
            'relativity' : 1,
            'label' : 'Seconds'
          }
        },
        yearArray = [];

    // Set values for year field
    while (currentYear >= 1900) {
        yearArray.push('<option value="' + currentYear + '">' + currentYear + '</option>');
        currentYear -= 1;
    }
    yearField.innerHTML = yearField.innerHTML + yearArray.join('');

    // Attach click event to submit
    submitButton.addEventListener('click', function (e) {
        var results = [];
        e.preventDefault();

        try {
            // Build date object from entered DOB
            dob.setDate(parseInt(dayField.options[dayField.selectedIndex], 10).value);
            dob.setFullYear(parseInt(yearField.options[yearField.selectedIndex].value, 10));
            dob.setMonth(parseInt(monthField.options[monthField.selectedIndex].value, 10) - 1); // why JavaScript?
        } catch (err) {
            return false;
        }

        // Push default unit
        results.push((Math.round((todayUnixTime - (Math.round(dob.getTime() / 1000))) / 86400)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Days');
        
        // Push additional units if requested
        for (var label in unitLabels) {
          if (unitLabels.hasOwnProperty(label)) {
            if (d.getElementById(label).checked === true) {
              results.push((Math.round((todayUnixTime - (Math.round(dob.getTime() / 1000))) / unitLabels[label]['relativity'])).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + unitLabels[label]['label']);
            }
          }
        }
        
        // Show results
        resultElement.innerHTML = results.join('<hr />') + '<br /> Since you were born!';
        resultContainer.style.display = 'block';
        return false;
    }, false);

    // Attach click event to cancel
    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();

        yearField.selectedIndex = 0;
        monthField.selectedIndex = 0;
        dayField.selectedIndex = 0;

        moreContainerElement.style.display = 'none';
        moreLinkElement.innerHTML = 'More [+]';

        resultContainer.style.display = 'none';
        resultElement.innerHTML = '';
        
        for (var label in unitLabels) {
          if (unitLabels.hasOwnProperty(label)) {
            d.getElementById(label).checked = false;
          }
        }
    }, false);

    // Attach event to more link
    moreLinkElement.addEventListener('click', function (e) {
      var isVisible = moreContainerElement.style.display === 'block';
      e.preventDefault();
      
      if (isVisible === false) {
        moreContainerElement.style.display = 'block';
        moreLinkElement.innerHTML = 'Less [-]';
      } else {
        moreContainerElement.style.display = 'none';
        moreLinkElement.innerHTML = 'More [+]';
      }
    }, false);
}(document));