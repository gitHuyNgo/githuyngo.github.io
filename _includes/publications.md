<h2 id="publications">Publications</h2>

{% if site.data.publications.main.size > 0 %}
<div class="publications">
<ol class="bibliography">
{% for link in site.data.publications.main %}
<li>
  <div class="pub-row">
    {% if link.image and link.image != "" %}
    <div class="col-sm-3 abbr">
      <img src="{{ link.image | relative_url }}" alt="{{ link.image_alt | default: link.title | escape }}" class="teaser" loading="lazy">
      {% if link.conference_short %}<span class="badge">{{ link.conference_short | escape }}</span>{% endif %}
    </div>
    {% endif %}
    <div class="col-sm-9">
      {% assign title_url = link.publisher | default: link.pdf | default: link.page %}
      <div class="title">{% if title_url %}<a href="{{ title_url | relative_url }}">{{ link.title | escape }}</a>{% else %}{{ link.title | escape }}{% endif %}</div>
      <div class="author">{{ link.authors }}</div>
      <div class="periodical"><em>{{ link.conference }}{% if link.year %}, {{ link.year | escape }}{% endif %}</em></div>
      <div class="links">
        {% if link.pdf %}<a href="{{ link.pdf | relative_url }}" class="btn btn-sm" target="_blank" rel="noopener noreferrer">PDF</a>{% endif %}
        {% if link.publisher %}<a href="{{ link.publisher }}" class="btn btn-sm" target="_blank" rel="noopener noreferrer">Publisher</a>{% endif %}
        {% if link.code %}<a href="{{ link.code | relative_url }}" class="btn btn-sm" target="_blank" rel="noopener noreferrer">Code</a>{% endif %}
        {% if link.page %}<a href="{{ link.page | relative_url }}" class="btn btn-sm" target="_blank" rel="noopener noreferrer">Project Page</a>{% endif %}
        {% if link.bibtex %}<a href="{{ link.bibtex | relative_url }}" class="btn btn-sm" target="_blank" rel="noopener noreferrer">BibTeX</a>{% endif %}
        {% if link.notes %}<strong class="publication-note">{{ link.notes | escape }}</strong>{% endif %}
        {% if link.others %}{{ link.others }}{% endif %}
      </div>
    </div>
  </div>
</li>
{% endfor %}
</ol>
</div>
{% else %}
<p class="empty-state">No publications listed yet.</p>
{% endif %}
